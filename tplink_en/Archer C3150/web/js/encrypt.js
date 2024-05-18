// JavaScript Document
(function($){
	$.rsa = $.rsa || {};
	$.rsa.encrypt = function (val, nn, ee){	//n, e, 
		// Copyright (c) 2005  Tom Wu
		// All Rights Reserved.
		// See "LICENSE" for details.

		// Basic JavaScript BN library - subset useful for RSA encryption.

		// Bits per digit
		var dbits;

		// JavaScript engine analysis
		var canary = 0xdeadbeefcafe;
		var j_lm = ((canary&0xffffff)==0xefcafe);

		// (public) Constructor
		function BigInteger(a,b,c) {
			if(a != null){
				if("number" == typeof a){
					this.fromNumber(a, b, c);
				}else if(b == null && "string" != typeof a){
					this.fromString(a, 256);
				}else{
					this.fromString(a, b);
				}
			}
		}

		// return new, unset BigInteger
		function nbi() {
			return new BigInteger(null);
		}

		// am: Compute w_j += (x*this_i), propagate carries,
		// c is initial carry, returns final carry.
		// c < 3*dvalue, x < 2*dvalue, this_i < dvalue
		// We need to select the fastest one that works in this environment.

		// am1: use a single mult and divide to get the high bits,
		// max digit bits should be 26 because
		// max internal value = 2*dvalue^2-2*dvalue (< 2^53)
		function am1(i,x,w,j,c,n) {
			while(--n >= 0) {
				var v = x*this[i++]+w[j]+c;
				c = Math.floor(v/0x4000000);
				w[j++] = v&0x3ffffff;
			}
			return c;
		}
		// am2 avoids a big mult-and-extract completely.
		// Max digit bits should be <= 30 because we do bitwise ops
		// on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
		function am2(i,x,w,j,c,n) {
			var xl = x&0x7fff, xh = x>>15;
			while(--n >= 0) {
				var l = this[i]&0x7fff;
				var h = this[i++]>>15;
				var m = xh*l+h*xl;
				l = xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);
				c = (l>>>30)+(m>>>15)+xh*h+(c>>>30);
				w[j++] = l&0x3fffffff;
			}
			return c;
		}
		// Alternately, set max digit bits to 28 since some
		// browsers slow down when dealing with 32-bit numbers.
		function am3(i,x,w,j,c,n) {
			var xl = x&0x3fff, xh = x>>14;
			while(--n >= 0) {
				var l = this[i]&0x3fff;
				var h = this[i++]>>14;
				var m = xh*l+h*xl;
				l = xl*l+((m&0x3fff)<<14)+w[j]+c;
				c = (l>>28)+(m>>14)+xh*h;
				w[j++] = l&0xfffffff;
			}
			return c;
		}
		
		if(j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
			BigInteger.prototype.am = am2;
			dbits = 30;
		}else if(j_lm && (navigator.appName != "Netscape")) {
			BigInteger.prototype.am = am1;
			dbits = 26;
		}else { // Mozilla/Netscape seems to prefer am3
			BigInteger.prototype.am = am3;
			dbits = 28;
		}

		BigInteger.prototype.DB = dbits;
		BigInteger.prototype.DM = ((1<<dbits)-1);
		BigInteger.prototype.DV = (1<<dbits);

		var BI_FP = 52;
		BigInteger.prototype.FV = Math.pow(2,BI_FP);
		BigInteger.prototype.F1 = BI_FP-dbits;
		BigInteger.prototype.F2 = 2*dbits-BI_FP;

		// Digit conversions
		var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
		var BI_RC = new Array();
		var rr,vv;
		rr = "0".charCodeAt(0);
		for(vv = 0; vv <= 9; ++vv){
			BI_RC[rr++] = vv;
		}
		rr = "a".charCodeAt(0);
		for(vv = 10; vv < 36; ++vv){
			BI_RC[rr++] = vv;
		}
		rr = "A".charCodeAt(0);
		for(vv = 10; vv < 36; ++vv){
			BI_RC[rr++] = vv;
		}

		function int2char(n) {
			return BI_RM.charAt(n);
		}
		function intAt(s,i) {
			var c = BI_RC[s.charCodeAt(i)];
			return (c==null)?-1:c;
		}

		// (protected) copy this to r
		function bnpCopyTo(r) {
			for(var i = this.t-1; i >= 0; --i){
				r[i] = this[i];
			};
			r.t = this.t;
			r.s = this.s;
		}

		// (protected) set from integer value x, -DV <= x < DV
		function bnpFromInt(x) {
			this.t = 1;
			this.s = (x<0)?-1:0;
			if(x > 0){
				this[0] = x;
			}else if(x < -1){
				this[0] = x+this.DV;
			}else{
				this.t = 0;
			}
		}

		// return bigint initialized to value
		function nbv(i) {
			var r = nbi();
			r.fromInt(i);
			return r;
		}

		// (protected) set from string and radix
		function bnpFromString(s,b) {
			var k;
			if(b == 16){
				k = 4;
			}else if(b == 8){
				k = 3;
			}else if(b == 256){
				k = 8; // byte array
			}else if(b == 2){
				k = 1;
			}else if(b == 32){
				k = 5;
			}else if(b == 4){
				k = 2;
			}else{
				this.fromRadix(s,b);
				return; 
			};
			
			this.t = 0;
			this.s = 0;
			
			var i = s.length, mi = false, sh = 0;
			while(--i >= 0) {
				var x = (k==8)?s[i]&0xff:intAt(s,i);
				if(x < 0) {
					if(s.charAt(i) == "-") {mi = true;}
					continue;
				};
				mi = false;
				if(sh == 0){
					this[this.t++] = x;
				}else if(sh+k > this.DB) {
					this[this.t-1] |= (x&((1<<(this.DB-sh))-1))<<sh;
					this[this.t++] = (x>>(this.DB-sh));
				}
				else
				this[this.t-1] |= x<<sh;
				sh += k;
				if(sh >= this.DB) sh -= this.DB;
			};
			if(k == 8 && (s[0]&0x80) != 0) {
				this.s = -1;
				if(sh > 0){
					this[this.t-1] |= ((1<<(this.DB-sh))-1)<<sh;
				}
			};
			this.clamp();
			
			if(mi){
				BigInteger.ZERO.subTo(this,this)
			};
		}

		// (protected) clamp off excess high words
		function bnpClamp() {
			var c = this.s&this.DM;
			while(this.t > 0 && this[this.t-1] == c){
				--this.t;
			}
		}

		// (public) return string representation in given radix
		function bnToString(b) {

			if(this.s < 0){ return "-"+this.negate().toString(b);}
			var k;
			if(b == 16){k = 4;}
			else if(b == 8){ k = 3;}
			else if(b == 2){ k = 1;}
			else if(b == 32){ k = 5;}
			else if(b == 4){ k = 2;}
			else{ return this.toRadix(b);}
			
			var km = (1<<k)-1, d, m = false, r = "", i = this.t;
			var p = this.DB-(i*this.DB)%k;
			if(i-- > 0) {
				if(p < this.DB && (d = this[i]>>p) > 0) { m = true; r = int2char(d); }
				while(i >= 0) {
					if(p < k) {
						d = (this[i]&((1<<p)-1))<<(k-p);
						d |= this[--i]>>(p+=this.DB-k);
					}else {
						d = (this[i]>>(p-=k))&km;
						if(p <= 0) { p += this.DB; --i; }
					}
					if(d > 0){ m = true;}
					if(m){ r += int2char(d);}
				}
			}
			return m?r:"0";
		}

		// (public) -this
		function bnNegate() { var r = nbi(); BigInteger.ZERO.subTo(this,r); return r; }

		// (public) |this|
		function bnAbs() { return (this.s<0)?this.negate():this; }

		// (public) return + if this > a, - if this < a, 0 if equal
		function bnCompareTo(a) {
			var r = this.s-a.s;
			if(r != 0){ return r;}
			var i = this.t;
			r = i-a.t;
			if(r != 0){ return (this.s<0)?-r:r;}
			while(--i >= 0){ if((r=this[i]-a[i]) != 0) return r;}
			return 0;
		}

		// returns bit length of the integer x
		function nbits(x) {
			var r = 1, t;
			if((t=x>>>16) != 0) { x = t; r += 16; }
			if((t=x>>8) != 0) { x = t; r += 8; }
			if((t=x>>4) != 0) { x = t; r += 4; }
			if((t=x>>2) != 0) { x = t; r += 2; }
			if((t=x>>1) != 0) { x = t; r += 1; }
			return r;
		}

		// (public) return the number of bits in "this"
		function bnBitLength() {
			if(this.t <= 0) return 0;
			return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));
		}

		// (protected) r = this << n*DB
		function bnpDLShiftTo(n,r) {
			var i;
			for(i = this.t-1; i >= 0; --i){ r[i+n] = this[i];}
			for(i = n-1; i >= 0; --i){ r[i] = 0;}
			r.t = this.t+n;
			r.s = this.s;
		}

		// (protected) r = this >> n*DB
		function bnpDRShiftTo(n,r) {
			for(var i = n; i < this.t; ++i){ r[i-n] = this[i];}
			r.t = Math.max(this.t-n,0);
			r.s = this.s;
		}

		// (protected) r = this << n
		function bnpLShiftTo(n,r) {
			var bs = n%this.DB;
			var cbs = this.DB-bs;
			var bm = (1<<cbs)-1;
			var ds = Math.floor(n/this.DB), c = (this.s<<bs)&this.DM, i;
			for(i = this.t-1; i >= 0; --i) {
				r[i+ds+1] = (this[i]>>cbs)|c;
				c = (this[i]&bm)<<bs;
			}
			for(i = ds-1; i >= 0; --i){ r[i] = 0;}
			r[ds] = c;
			r.t = this.t+ds+1;
			r.s = this.s;
			r.clamp();
		}

		// (protected) r = this >> n
		function bnpRShiftTo(n,r) {
			r.s = this.s;
			var ds = Math.floor(n/this.DB);
			if(ds >= this.t) { r.t = 0; return; }
			var bs = n%this.DB;
			var cbs = this.DB-bs;
			var bm = (1<<bs)-1;
			r[0] = this[ds]>>bs;
			for(var i = ds+1; i < this.t; ++i) {
				r[i-ds-1] |= (this[i]&bm)<<cbs;
				r[i-ds] = this[i]>>bs;
			}
			if(bs > 0){ r[this.t-ds-1] |= (this.s&bm)<<cbs;}
			r.t = this.t-ds;
			r.clamp();
		}

		// (protected) r = this - a
		function bnpSubTo(a,r) {
			var i = 0, c = 0, m = Math.min(a.t,this.t);
			while(i < m) {
			c += this[i]-a[i];
			r[i++] = c&this.DM;
			c >>= this.DB;
			}
			if(a.t < this.t) {
			c -= a.s;
			while(i < this.t) {
			c += this[i];
			r[i++] = c&this.DM;
			c >>= this.DB;
			}
			c += this.s;
			}
			else {
			c += this.s;
			while(i < a.t) {
			c -= a[i];
			r[i++] = c&this.DM;
			c >>= this.DB;
			}
			c -= a.s;
			}
			r.s = (c<0)?-1:0;
			if(c < -1) r[i++] = this.DV+c;
			else if(c > 0) r[i++] = c;
			r.t = i;
			r.clamp();
		}

		// (protected) r = this * a, r != this,a (HAC 14.12)
		// "this" should be the larger one if appropriate.
		function bnpMultiplyTo(a,r) {
			var x = this.abs(), y = a.abs();
			var i = x.t;
			r.t = i+y.t;
			while(--i >= 0) r[i] = 0;
			for(i = 0; i < y.t; ++i) r[i+x.t] = x.am(0,y[i],r,i,0,x.t);
			r.s = 0;
			r.clamp();
			if(this.s != a.s) BigInteger.ZERO.subTo(r,r);
		}

		// (protected) r = this^2, r != this (HAC 14.16)
		function bnpSquareTo(r) {
			var x = this.abs();
			var i = r.t = 2*x.t;
			while(--i >= 0) {
				r[i] = 0;
			}
			for(i = 0; i < x.t-1; ++i) {
				var c = x.am(i,x[i],r,2*i,0,1);
				if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1)) >= x.DV) {
					r[i+x.t] -= x.DV;
					r[i+x.t+1] = 1;
				}
			}
			if(r.t > 0) {
				r[r.t-1] += x.am(i,x[i],r,2*i,0,1);
			}
			r.s = 0;
			r.clamp();
		}

		// (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
		// r != q, this != m.  q or r may be null.
		function bnpDivRemTo(m,q,r) {
			var pm = m.abs();
			if(pm.t <= 0) {return;}
			var pt = this.abs();
			if(pt.t < pm.t) {
				if(q != null) {q.fromInt(0);}
				if(r != null) {this.copyTo(r);}
				return;
			}
			if(r == null) {r = nbi();}
			var y = nbi(), ts = this.s, ms = m.s;
			var nsh = this.DB-nbits(pm[pm.t-1]);	// normalize modulus
			
			if(nsh > 0) {
				pm.lShiftTo(nsh,y); pt.lShiftTo(nsh,r);
			}else {
				pm.copyTo(y); pt.copyTo(r);
			}
			
			var ys = y.t;
			var y0 = y[ys-1];
			if(y0 == 0) {return;}
			var yt = y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);
			var d1 = this.FV/yt, d2 = (1<<this.F1)/yt, e = 1<<this.F2;
			var i = r.t, j = i-ys, t = (q==null)?nbi():q;
			y.dlShiftTo(j,t);
			
			if(r.compareTo(t) >= 0) {
				r[r.t++] = 1;
				r.subTo(t,r);
			}
			BigInteger.ONE.dlShiftTo(ys,t);
			t.subTo(y,y);	// "negative" y so we can replace sub with am later
			while(y.t < ys) {y[y.t++] = 0;}
			while(--j >= 0) {
				// Estimate quotient digit
				var qd = (r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);
				if((r[i]+=y.am(0,qd,r,j,0,ys)) < qd) {	// Try it out
					y.dlShiftTo(j,t);
					r.subTo(t,r);
					while(r[i] < --qd) {
						r.subTo(t,r);
					}
				}
			}
			if(q != null) {
				r.drShiftTo(ys,q);
				if(ts != ms) {BigInteger.ZERO.subTo(q,q);}
			}
			r.t = ys;
			r.clamp();
			if(nsh > 0) {
				r.rShiftTo(nsh,r);
			}	// Denormalize remainder
			if(ts < 0) {
				BigInteger.ZERO.subTo(r,r);
			}
		}

		// (public) this mod a
		function bnMod(a) {
			var r = nbi();
			this.abs().divRemTo(a,null,r);
			if(this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {a.subTo(r,r);}
			return r;
		}

		// Modular reduction using "classic" algorithm
		function Classic(m) { this.m = m; }
		function cConvert(x) {
			if(x.s < 0 || x.compareTo(this.m) >= 0) {return x.mod(this.m);}
			else {return x;}
		}
		function cRevert(x) { return x; }
		function cReduce(x) { x.divRemTo(this.m,null,x); }
		function cMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }
		function cSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

		Classic.prototype.convert = cConvert;
		Classic.prototype.revert = cRevert;
		Classic.prototype.reduce = cReduce;
		Classic.prototype.mulTo = cMulTo;
		Classic.prototype.sqrTo = cSqrTo;

		// (protected) return "-1/this % 2^DB"; useful for Mont. reduction
		// justification:
		//         xy == 1 (mod m)
		//         xy =  1+km
		//   xy(2-xy) = (1+km)(1-km)
		// x[y(2-xy)] = 1-k^2m^2
		// x[y(2-xy)] == 1 (mod m^2)
		// if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
		// should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
		// JS multiply "overflows" differently from C/C++, so care is needed here.
		function bnpInvDigit() {
			if(this.t < 1) {return 0;}
			var x = this[0];
			if((x&1) == 0) {return 0;}
			var y = x&3;		// y == 1/x mod 2^2
			y = (y*(2-(x&0xf)*y))&0xf;	// y == 1/x mod 2^4
			y = (y*(2-(x&0xff)*y))&0xff;	// y == 1/x mod 2^8
			y = (y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;	// y == 1/x mod 2^16
			// last step - calculate inverse mod DV directly;
			// assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
			y = (y*(2-x*y%this.DV))%this.DV;		// y == 1/x mod 2^dbits
			// we really want the negative inverse, and -DV < y < DV
			return (y>0)?this.DV-y:-y;
		}

		// Montgomery reduction
		function Montgomery(m) {
			this.m = m;
			this.mp = m.invDigit();
			this.mpl = this.mp&0x7fff;
			this.mph = this.mp>>15;
			this.um = (1<<(m.DB-15))-1;
			this.mt2 = 2*m.t;
		}

		// xR mod m
		function montConvert(x) {
			var r = nbi();
			x.abs().dlShiftTo(this.m.t,r);
			r.divRemTo(this.m,null,r);
			if(x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {this.m.subTo(r,r);}
			return r;
		}

		// x/R mod m
		function montRevert(x) {
			var r = nbi();
			x.copyTo(r);
			this.reduce(r);
			return r;
		}

		// x = x/R mod m (HAC 14.32)
		function montReduce(x) {
			while(x.t <= this.mt2)	// pad x so am has enough room later
			x[x.t++] = 0;
			for(var i = 0; i < this.m.t; ++i) {
				// faster way of calculating u0 = x[i]*mp mod DV
				var j = x[i]&0x7fff;
				var u0 = (j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;
				// use am to combine the multiply-shift-add into one call
				j = i+this.m.t;
				x[j] += this.m.am(0,u0,x,i,0,this.m.t);
				// propagate carry
				while(x[j] >= x.DV) { x[j] -= x.DV; x[++j]++; }
			}
			x.clamp();
			x.drShiftTo(this.m.t,x);
			if(x.compareTo(this.m) >= 0) {x.subTo(this.m,x);}
		}

		// r = "x^2/R mod m"; x != r
		function montSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

		// r = "xy/R mod m"; x,y != r
		function montMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }

		Montgomery.prototype.convert = montConvert;
		Montgomery.prototype.revert = montRevert;
		Montgomery.prototype.reduce = montReduce;
		Montgomery.prototype.mulTo = montMulTo;
		Montgomery.prototype.sqrTo = montSqrTo;

		// (protected) true iff this is even
		function bnpIsEven() {
			return ((this.t>0)?(this[0]&1):this.s) == 0;
		}

		// (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
		function bnpExp(e,z) {
			if(e > 0xffffffff || e < 1){
				return BigInteger.ONE;
			}
			var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e)-1;
			g.copyTo(r);
			while(--i >= 0){
				z.sqrTo(r,r2);
				
				if((e&(1<<i)) > 0){
					z.mulTo(r2,g,r);
				}else{
					var t = r;
					r = r2;
					r2 = t;
				}
			}
			return z.revert(r);
		}

		// (public) this^e % m, 0 <= e < 2^32
		function bnModPowInt(e,m) {
			var z;
			if(e < 256 || m.isEven()) z = new Classic(m); else z = new Montgomery(m);
			return this.exp(e,z);
		}

		// protected
		BigInteger.prototype.copyTo = bnpCopyTo;
		BigInteger.prototype.fromInt = bnpFromInt;
		BigInteger.prototype.fromString = bnpFromString;
		BigInteger.prototype.clamp = bnpClamp;
		BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
		BigInteger.prototype.drShiftTo = bnpDRShiftTo;
		BigInteger.prototype.lShiftTo = bnpLShiftTo;
		BigInteger.prototype.rShiftTo = bnpRShiftTo;
		BigInteger.prototype.subTo = bnpSubTo;
		BigInteger.prototype.multiplyTo = bnpMultiplyTo;
		BigInteger.prototype.squareTo = bnpSquareTo;
		BigInteger.prototype.divRemTo = bnpDivRemTo;
		BigInteger.prototype.invDigit = bnpInvDigit;
		BigInteger.prototype.isEven = bnpIsEven;
		BigInteger.prototype.exp = bnpExp;

		// public
		BigInteger.prototype.toString = bnToString;
		BigInteger.prototype.negate = bnNegate;
		BigInteger.prototype.abs = bnAbs;
		BigInteger.prototype.compareTo = bnCompareTo;
		BigInteger.prototype.bitLength = bnBitLength;
		BigInteger.prototype.mod = bnMod;
		BigInteger.prototype.modPowInt = bnModPowInt;

		// "constants"
		BigInteger.ZERO = nbv(0);
		BigInteger.ONE = nbv(1);

		//end of jsbn.js

		// prng4.js - uses Arcfour as a PRNG

		function Arcfour() {
			this.i = 0;
			this.j = 0;
			this.S = new Array();
		}

		// Initialize arcfour context from key, an array of ints, each from [0..255]
		function ARC4init(key) {
			var i, j, t;
			for(i = 0; i < 256; ++i)
			this.S[i] = i;
			j = 0;
			for(i = 0; i < 256; ++i) {
				j = (j + this.S[i] + key[i % key.length]) & 255;
				t = this.S[i];
				this.S[i] = this.S[j];
				this.S[j] = t;
			}
			this.i = 0;
			this.j = 0;
		}

		function ARC4next() {
			var t;
			this.i = (this.i + 1) & 255;
			this.j = (this.j + this.S[this.i]) & 255;
			t = this.S[this.i];
			this.S[this.i] = this.S[this.j];
			this.S[this.j] = t;
			return this.S[(t + this.S[this.i]) & 255];
		}

		Arcfour.prototype.init = ARC4init;
		Arcfour.prototype.next = ARC4next;

		// Plug in your RNG constructor here
		function prng_newstate() {
			return new Arcfour();
		}

		// Pool size must be a multiple of 4 and greater than 32.
		// An array of bytes the size of the pool will be passed to init()
		var rng_psize = 256;

		//end of prng4.js
		// Random number generator - requires a PRNG backend, e.g. prng4.js

		// For best results, put code like
		// <body onClick='rng_seed_time();' onKeyPress='rng_seed_time();'>
		// in your main HTML document.

		var rng_state;
		var rng_pool;
		var rng_pptr;

		// Mix in a 32-bit integer into the pool
		function rng_seed_int(x) {
			rng_pool[rng_pptr++] ^= x & 255;
			rng_pool[rng_pptr++] ^= (x >> 8) & 255;
			rng_pool[rng_pptr++] ^= (x >> 16) & 255;
			rng_pool[rng_pptr++] ^= (x >> 24) & 255;
			
			if(rng_pptr >= rng_psize) {
				rng_pptr -= rng_psize;
			}
		}

		// Mix in the current time (w/milliseconds) into the pool
		function rng_seed_time() {
			rng_seed_int(new Date().getTime());
		}

		// Initialize the pool with junk if needed.
		if(rng_pool == null) {
			rng_pool = new Array();
			rng_pptr = 0;
			
			var t;
			if(window.crypto && window.crypto.getRandomValues) {
				// Use webcrypto if available
				var ua = new Uint8Array(32);
				window.crypto.getRandomValues(ua);
				for(t = 0; t < 32; ++t){
					rng_pool[rng_pptr++] = ua[t];
				}
			}
			if(navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto) {
				// Extract entropy (256 bits) from NS4 RNG if available
				var z = window.crypto.random(32);
				for(t = 0; t < z.length; ++t)
				rng_pool[rng_pptr++] = z.charCodeAt(t) & 255;
			}  
			while(rng_pptr < rng_psize) {  // extract some randomness from Math.random()
				t = Math.floor(65536 * Math.random());
				rng_pool[rng_pptr++] = t >>> 8;
				rng_pool[rng_pptr++] = t & 255;
			}
			rng_pptr = 0;
			rng_seed_time();
			//rng_seed_int(window.screenX);
			//rng_seed_int(window.screenY);
		}

		function rng_get_byte() {
			if(rng_state == null) {
				rng_seed_time();
				rng_state = prng_newstate();
				rng_state.init(rng_pool);
				
				for(rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr){
					rng_pool[rng_pptr] = 0;
				}
				rng_pptr = 0;
					//rng_pool = null;
			}
			// TODO: allow reseeding after first request
			return rng_state.next();
		}

		function rng_get_bytes(ba) {
			var i;
			for(i = 0; i < ba.length; ++i){
				ba[i] = rng_get_byte();
			}
		}

		function SecureRandom() {}

		SecureRandom.prototype.nextBytes = rng_get_bytes;


		//end of rng.js

		// Depends on jsbn.js and rng.js

		// Version 1.1: support utf-8 encoding in pkcs1pad2

		// convert a (hex) string to a bignum object
		function parseBigInt(str,r) {
			return new BigInteger(str,r);
		}

		/*function linebrk(s,n) {
			var ret = "";
			var i = 0;
			while(i + n < s.length) {
				ret += s.substring(i,i+n) + "";
				i += n;
			};
			return ret + s.substring(i,s.length);
		}*/

		function byte2Hex(b) {
			if(b < 0x10){
				return "0" + b.toString(16);
			}else{
				return b.toString(16);
			}
		}

		// PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint
                function pkcs1pad2(s,n){
		  if(n < s.length + 11) { // TODO: fix for utf-8
		//alert("Message too long for RSA");
		return null;
		}
		var ba = new Array();
		var i = s.length - 1;
		while(i >= 0 && n > 0) {
		var c = s.charCodeAt(i--);
		if(c < 128) { // encode using utf-8
		ba[--n] = c;
		}
		else if((c > 127) && (c < 2048)) {
		ba[--n] = (c & 63) | 128;
		ba[--n] = (c >> 6) | 192;
		}
		else {
		ba[--n] = (c & 63) | 128;
		ba[--n] = ((c >> 6) & 63) | 128;
		ba[--n] = (c >> 12) | 224;
		}
		}
		ba[--n] = 0;
		var rng = new SecureRandom();
		var x = new Array();
		while(n > 2) { // random non-zero pad
		x[0] = 0;
		while(x[0] == 0) rng.nextBytes(x);
		ba[--n] = x[0];
		}
		ba[--n] = 2;
		ba[--n] = 0;
		return new BigInteger(ba);
		}

		// "empty" RSA key constructor
		function RSAKey() {
			this.n = null;
			this.e = 0;
			this.d = null;
			this.p = null;
			this.q = null;
			this.dmp1 = null;
			this.dmq1 = null;
			this.coeff = null;
		}

		// Set the public key fields N and e from hex strings
		function RSASetPublic(N,E) {
			if(N != null && E != null && N.length > 0 && E.length > 0) {
				this.n = parseBigInt(N,16);
				this.e = parseInt(E,16);
			}else{
				alert("Invalid RSA public key");
			}
		}

		// Perform raw public operation on "x": return x^e (mod n)
		function RSADoPublic(x) {
			return x.modPowInt(this.e, this.n);
		}

		function nopadding(s,n) {
			if(n < s.length) { // TODO: fix for utf-8
				alert("Message too long for RSA");
				return null;
			};
			//console.log(s, n)
			var ba = new Array();
			var i = 0;
			var j = 0;
			while(i < s.length && j < n) {
				var c = s.charCodeAt(i++);
				if(c < 128) { // encode using utf-8
					ba[j++] = c;
				}else if((c > 127) && (c < 2048)){
					ba[j++] = (c & 63) | 128;
					ba[j++] = (c >> 6) | 192;
				}else{
					ba[j++] = (c & 63) | 128;
					ba[j++] = ((c >> 6) & 63) | 128;
					ba[j++] = (c >> 12) | 224;
				}
			};
			while (j < n) {
				ba[j++] = 0;
			};
			//console.log(ba)
			return new BigInteger(ba);
		}

		// Return the PKCS#1 RSA encryption of "text" as an even-length hex string
		function RSAEncrypt(text) {
			//var m = nopadding(text, (this.n.bitLength()+7)>>3 );
                        var m  = pkcs1pad2(text, (this.n.bitLength()+7)>>3 );
			if(m == null){
				return null
			};
			
			var c = this.doPublic(m);
			//console.log(c);
			if(c == null){
				return null
			};
			
			var h = c.toString(16);
			if((h.length & 1) == 0){
				return h;
			}else{
				return "0" + h
			};
		}

		// Return the PKCS#1 RSA encryption of "text" as a Base64-encoded string
		//function RSAEncryptB64(text) {
		//  var h = this.encrypt(text);
		//  if(h) return hex2b64(h); else return null;
		//}

		// protected
		RSAKey.prototype.doPublic = RSADoPublic;

		// public
		RSAKey.prototype.setPublic = RSASetPublic;
		RSAKey.prototype.encrypt = RSAEncrypt;
		//RSAKey.prototype.encrypt_b64 = RSAEncryptB64;


		//calculate  rsa value
		var rsaObj = new RSAKey();
		var n = nn;
		var e = ee;
		rsaObj.setPublic(n, e);
		
		var result = rsaObj.encrypt(val);
		//var result = linebrk(res, 64);
		//console.log(result)
		if(result.length != 256){
			//$.su.encrypt(n,e,val);
			var l = Math.abs(256 - result.length);
			for (var i = 0; i < l; i++){
				result = "0" + result;
			};
		}
		return result;

	};

    $.des = function (key, message, encrypt, mode, iv, padding) {
        if (encrypt) //如果是加密的话，首先转换编码
            message = unescape(encodeURIComponent(message));
        //declaring this locally speeds things up a bit
        var spfunction1 = new Array(0x1010400, 0, 0x10000, 0x1010404, 0x1010004, 0x10404, 0x4, 0x10000, 0x400, 0x1010400, 0x1010404, 0x400, 0x1000404, 0x1010004, 0x1000000, 0x4, 0x404, 0x1000400, 0x1000400, 0x10400, 0x10400, 0x1010000, 0x1010000, 0x1000404, 0x10004, 0x1000004, 0x1000004, 0x10004, 0, 0x404, 0x10404, 0x1000000, 0x10000, 0x1010404, 0x4, 0x1010000, 0x1010400, 0x1000000, 0x1000000, 0x400, 0x1010004, 0x10000, 0x10400, 0x1000004, 0x400, 0x4, 0x1000404, 0x10404, 0x1010404, 0x10004, 0x1010000, 0x1000404, 0x1000004, 0x404, 0x10404, 0x1010400, 0x404, 0x1000400, 0x1000400, 0, 0x10004, 0x10400, 0, 0x1010004);
        var spfunction2 = new Array(-0x7fef7fe0, -0x7fff8000, 0x8000, 0x108020, 0x100000, 0x20, -0x7fefffe0, -0x7fff7fe0, -0x7fffffe0, -0x7fef7fe0, -0x7fef8000, -0x80000000, -0x7fff8000, 0x100000, 0x20, -0x7fefffe0, 0x108000, 0x100020, -0x7fff7fe0, 0, -0x80000000, 0x8000, 0x108020, -0x7ff00000, 0x100020, -0x7fffffe0, 0, 0x108000, 0x8020, -0x7fef8000, -0x7ff00000, 0x8020, 0, 0x108020, -0x7fefffe0, 0x100000, -0x7fff7fe0, -0x7ff00000, -0x7fef8000, 0x8000, -0x7ff00000, -0x7fff8000, 0x20, -0x7fef7fe0, 0x108020, 0x20, 0x8000, -0x80000000, 0x8020, -0x7fef8000, 0x100000, -0x7fffffe0, 0x100020, -0x7fff7fe0, -0x7fffffe0, 0x100020, 0x108000, 0, -0x7fff8000, 0x8020, -0x80000000, -0x7fefffe0, -0x7fef7fe0, 0x108000);
        var spfunction3 = new Array(0x208, 0x8020200, 0, 0x8020008, 0x8000200, 0, 0x20208, 0x8000200, 0x20008, 0x8000008, 0x8000008, 0x20000, 0x8020208, 0x20008, 0x8020000, 0x208, 0x8000000, 0x8, 0x8020200, 0x200, 0x20200, 0x8020000, 0x8020008, 0x20208, 0x8000208, 0x20200, 0x20000, 0x8000208, 0x8, 0x8020208, 0x200, 0x8000000, 0x8020200, 0x8000000, 0x20008, 0x208, 0x20000, 0x8020200, 0x8000200, 0, 0x200, 0x20008, 0x8020208, 0x8000200, 0x8000008, 0x200, 0, 0x8020008, 0x8000208, 0x20000, 0x8000000, 0x8020208, 0x8, 0x20208, 0x20200, 0x8000008, 0x8020000, 0x8000208, 0x208, 0x8020000, 0x20208, 0x8, 0x8020008, 0x20200);
        var spfunction4 = new Array(0x802001, 0x2081, 0x2081, 0x80, 0x802080, 0x800081, 0x800001, 0x2001, 0, 0x802000, 0x802000, 0x802081, 0x81, 0, 0x800080, 0x800001, 0x1, 0x2000, 0x800000, 0x802001, 0x80, 0x800000, 0x2001, 0x2080, 0x800081, 0x1, 0x2080, 0x800080, 0x2000, 0x802080, 0x802081, 0x81, 0x800080, 0x800001, 0x802000, 0x802081, 0x81, 0, 0, 0x802000, 0x2080, 0x800080, 0x800081, 0x1, 0x802001, 0x2081, 0x2081, 0x80, 0x802081, 0x81, 0x1, 0x2000, 0x800001, 0x2001, 0x802080, 0x800081, 0x2001, 0x2080, 0x800000, 0x802001, 0x80, 0x800000, 0x2000, 0x802080);
        var spfunction5 = new Array(0x100, 0x2080100, 0x2080000, 0x42000100, 0x80000, 0x100, 0x40000000, 0x2080000, 0x40080100, 0x80000, 0x2000100, 0x40080100, 0x42000100, 0x42080000, 0x80100, 0x40000000, 0x2000000, 0x40080000, 0x40080000, 0, 0x40000100, 0x42080100, 0x42080100, 0x2000100, 0x42080000, 0x40000100, 0, 0x42000000, 0x2080100, 0x2000000, 0x42000000, 0x80100, 0x80000, 0x42000100, 0x100, 0x2000000, 0x40000000, 0x2080000, 0x42000100, 0x40080100, 0x2000100, 0x40000000, 0x42080000, 0x2080100, 0x40080100, 0x100, 0x2000000, 0x42080000, 0x42080100, 0x80100, 0x42000000, 0x42080100, 0x2080000, 0, 0x40080000, 0x42000000, 0x80100, 0x2000100, 0x40000100, 0x80000, 0, 0x40080000, 0x2080100, 0x40000100);
        var spfunction6 = new Array(0x20000010, 0x20400000, 0x4000, 0x20404010, 0x20400000, 0x10, 0x20404010, 0x400000, 0x20004000, 0x404010, 0x400000, 0x20000010, 0x400010, 0x20004000, 0x20000000, 0x4010, 0, 0x400010, 0x20004010, 0x4000, 0x404000, 0x20004010, 0x10, 0x20400010, 0x20400010, 0, 0x404010, 0x20404000, 0x4010, 0x404000, 0x20404000, 0x20000000, 0x20004000, 0x10, 0x20400010, 0x404000, 0x20404010, 0x400000, 0x4010, 0x20000010, 0x400000, 0x20004000, 0x20000000, 0x4010, 0x20000010, 0x20404010, 0x404000, 0x20400000, 0x404010, 0x20404000, 0, 0x20400010, 0x10, 0x4000, 0x20400000, 0x404010, 0x4000, 0x400010, 0x20004010, 0, 0x20404000, 0x20000000, 0x400010, 0x20004010);
        var spfunction7 = new Array(0x200000, 0x4200002, 0x4000802, 0, 0x800, 0x4000802, 0x200802, 0x4200800, 0x4200802, 0x200000, 0, 0x4000002, 0x2, 0x4000000, 0x4200002, 0x802, 0x4000800, 0x200802, 0x200002, 0x4000800, 0x4000002, 0x4200000, 0x4200800, 0x200002, 0x4200000, 0x800, 0x802, 0x4200802, 0x200800, 0x2, 0x4000000, 0x200800, 0x4000000, 0x200800, 0x200000, 0x4000802, 0x4000802, 0x4200002, 0x4200002, 0x2, 0x200002, 0x4000000, 0x4000800, 0x200000, 0x4200800, 0x802, 0x200802, 0x4200800, 0x802, 0x4000002, 0x4200802, 0x4200000, 0x200800, 0, 0x2, 0x4200802, 0, 0x200802, 0x4200000, 0x800, 0x4000002, 0x4000800, 0x800, 0x200002);
        var spfunction8 = new Array(0x10001040, 0x1000, 0x40000, 0x10041040, 0x10000000, 0x10001040, 0x40, 0x10000000, 0x40040, 0x10040000, 0x10041040, 0x41000, 0x10041000, 0x41040, 0x1000, 0x40, 0x10040000, 0x10000040, 0x10001000, 0x1040, 0x41000, 0x40040, 0x10040040, 0x10041000, 0x1040, 0, 0, 0x10040040, 0x10000040, 0x10001000, 0x41040, 0x40000, 0x41040, 0x40000, 0x10041000, 0x1000, 0x40, 0x10040040, 0x1000, 0x41040, 0x10001000, 0x40, 0x10000040, 0x10040000, 0x10040040, 0x10000000, 0x40000, 0x10001040, 0, 0x10041040, 0x40040, 0x10000040, 0x10040000, 0x10001000, 0x10001040, 0, 0x10041040, 0x41000, 0x41000, 0x1040, 0x1040, 0x40040, 0x10000000, 0x10041000);

        //create the 16 or 48 subkeys we will need
        var keys = $.des_createKeys(key);
        var m = 0, i, j, temp, temp2, right1, right2, left, right, looping;
        var cbcleft, cbcleft2, cbcright, cbcright2
        var endloop, loopinc;
        var len = message.length;
        var chunk = 0;
        //set up the loops for single and triple des
        var iterations = keys.length == 32 ? 3 : 9; //single or triple des
        if (iterations == 3) {
            looping = encrypt ? new Array(0, 32, 2) : new Array(30, -2, -2);
        }
        else {
            looping = encrypt ? new Array(0, 32, 2, 62, 30, -2, 64, 96, 2) : new Array(94, 62, -2, 32, 64, 2, 30, -2, -2);
        }

        //pad the message depending on the padding parameter
        if (padding == 2) message += "        "; //pad the message with spaces
        else if (padding == 1) {
            if (encrypt) {
                temp = 8 - (len % 8);
                message += String.fromCharCode(temp, temp, temp, temp, temp, temp, temp, temp);
                if (temp === 8) len += 8;
            }
        } //PKCS7 padding
        else if (!padding) message += "\0\0\0\0\0\0\0\0"; //pad the message out with null bytes

        //store the result here
        var result = "";
        var tempresult = "";

        if (mode == 1) { //CBC mode
            cbcleft = (iv.charCodeAt(m++) << 24) | (iv.charCodeAt(m++) << 16) | (iv.charCodeAt(m++) << 8) | iv.charCodeAt(m++);
            cbcright = (iv.charCodeAt(m++) << 24) | (iv.charCodeAt(m++) << 16) | (iv.charCodeAt(m++) << 8) | iv.charCodeAt(m++);
            m = 0;
        }

        //loop through each 64 bit chunk of the message
        while (m < len) {
            left = (message.charCodeAt(m++) << 24) | (message.charCodeAt(m++) << 16) | (message.charCodeAt(m++) << 8) | message.charCodeAt(m++);
            right = (message.charCodeAt(m++) << 24) | (message.charCodeAt(m++) << 16) | (message.charCodeAt(m++) << 8) | message.charCodeAt(m++);

            //for Cipher Block Chaining mode, xor the message with the previous result
            if (mode == 1) {
                if (encrypt) {
                    left ^= cbcleft;
                    right ^= cbcright;
                } else {
                    cbcleft2 = cbcleft;
                    cbcright2 = cbcright;
                    cbcleft = left;
                    cbcright = right;
                }
            }

            //first each 64 but chunk of the message must be permuted according to IP
            temp = ((left >>> 4) ^ right) & 0x0f0f0f0f;
            right ^= temp;
            left ^= (temp << 4);
            temp = ((left >>> 16) ^ right) & 0x0000ffff;
            right ^= temp;
            left ^= (temp << 16);
            temp = ((right >>> 2) ^ left) & 0x33333333;
            left ^= temp;
            right ^= (temp << 2);
            temp = ((right >>> 8) ^ left) & 0x00ff00ff;
            left ^= temp;
            right ^= (temp << 8);
            temp = ((left >>> 1) ^ right) & 0x55555555;
            right ^= temp;
            left ^= (temp << 1);

            left = ((left << 1) | (left >>> 31));
            right = ((right << 1) | (right >>> 31));

            //do this either 1 or 3 times for each chunk of the message
            for (j = 0; j < iterations; j += 3) {
                endloop = looping[j + 1];
                loopinc = looping[j + 2];
                //now go through and perform the encryption or decryption
                for (i = looping[j]; i != endloop; i += loopinc) { //for efficiency
                    right1 = right ^ keys[i];
                    right2 = ((right >>> 4) | (right << 28)) ^ keys[i + 1];
                    //the result is attained by passing these bytes through the S selection functions
                    temp = left;
                    left = right;
                    right = temp ^ (spfunction2[(right1 >>> 24) & 0x3f] | spfunction4[(right1 >>> 16) & 0x3f]
                        | spfunction6[(right1 >>> 8) & 0x3f] | spfunction8[right1 & 0x3f]
                        | spfunction1[(right2 >>> 24) & 0x3f] | spfunction3[(right2 >>> 16) & 0x3f]
                        | spfunction5[(right2 >>> 8) & 0x3f] | spfunction7[right2 & 0x3f]);
                }
                temp = left;
                left = right;
                right = temp; //unreverse left and right
            } //for either 1 or 3 iterations

            //move then each one bit to the right
            left = ((left >>> 1) | (left << 31));
            right = ((right >>> 1) | (right << 31));

            //now perform IP-1, which is IP in the opposite direction
            temp = ((left >>> 1) ^ right) & 0x55555555;
            right ^= temp;
            left ^= (temp << 1);
            temp = ((right >>> 8) ^ left) & 0x00ff00ff;
            left ^= temp;
            right ^= (temp << 8);
            temp = ((right >>> 2) ^ left) & 0x33333333;
            left ^= temp;
            right ^= (temp << 2);
            temp = ((left >>> 16) ^ right) & 0x0000ffff;
            right ^= temp;
            left ^= (temp << 16);
            temp = ((left >>> 4) ^ right) & 0x0f0f0f0f;
            right ^= temp;
            left ^= (temp << 4);

            //for Cipher Block Chaining mode, xor the message with the previous result
            if (mode == 1) {
                if (encrypt) {
                    cbcleft = left;
                    cbcright = right;
                } else {
                    left ^= cbcleft2;
                    right ^= cbcright2;
                }
            }
            tempresult += String.fromCharCode((left >>> 24), ((left >>> 16) & 0xff), ((left >>> 8) & 0xff), (left & 0xff), (right >>> 24), ((right >>> 16) & 0xff), ((right >>> 8) & 0xff), (right & 0xff));

            chunk += 8;
            if (chunk == 512) {
                result += tempresult;
                tempresult = "";
                chunk = 0;
            }
        } //for every 8 characters, or 64 bits in the message

        //return the result as an array
        result += tempresult;
        result = result.replace(/\0*$/g, "");

        if (!encrypt) { //如果是解密的话，解密结束后对PKCS7 padding进行解码，并转换成utf-8编码
            if (padding === 1) { //PKCS7 padding解码
                var len = result.length, paddingChars = 0;
                len && (paddingChars = result.charCodeAt(len - 1));
                (paddingChars <= 8) && (result = result.substring(0, len - paddingChars));
            }
            //转换成UTF-8编码
            result = decodeURIComponent(escape(result));
        }

        return result;
    }; //end of des
//des_createKeys
//this takes as input a 64 bit key (even though only 56 bits are used)
//as an array of 2 integers, and returns 16 48 bit keys
    $.des_createKeys = function (key) {
        //declaring this locally speeds things up a bit
        var pc2bytes0 = new Array(0, 0x4, 0x20000000, 0x20000004, 0x10000, 0x10004, 0x20010000, 0x20010004, 0x200, 0x204, 0x20000200, 0x20000204, 0x10200, 0x10204, 0x20010200, 0x20010204);
        var pc2bytes1 = new Array(0, 0x1, 0x100000, 0x100001, 0x4000000, 0x4000001, 0x4100000, 0x4100001, 0x100, 0x101, 0x100100, 0x100101, 0x4000100, 0x4000101, 0x4100100, 0x4100101);
        var pc2bytes2 = new Array(0, 0x8, 0x800, 0x808, 0x1000000, 0x1000008, 0x1000800, 0x1000808, 0, 0x8, 0x800, 0x808, 0x1000000, 0x1000008, 0x1000800, 0x1000808);
        var pc2bytes3 = new Array(0, 0x200000, 0x8000000, 0x8200000, 0x2000, 0x202000, 0x8002000, 0x8202000, 0x20000, 0x220000, 0x8020000, 0x8220000, 0x22000, 0x222000, 0x8022000, 0x8222000);
        var pc2bytes4 = new Array(0, 0x40000, 0x10, 0x40010, 0, 0x40000, 0x10, 0x40010, 0x1000, 0x41000, 0x1010, 0x41010, 0x1000, 0x41000, 0x1010, 0x41010);
        var pc2bytes5 = new Array(0, 0x400, 0x20, 0x420, 0, 0x400, 0x20, 0x420, 0x2000000, 0x2000400, 0x2000020, 0x2000420, 0x2000000, 0x2000400, 0x2000020, 0x2000420);
        var pc2bytes6 = new Array(0, 0x10000000, 0x80000, 0x10080000, 0x2, 0x10000002, 0x80002, 0x10080002, 0, 0x10000000, 0x80000, 0x10080000, 0x2, 0x10000002, 0x80002, 0x10080002);
        var pc2bytes7 = new Array(0, 0x10000, 0x800, 0x10800, 0x20000000, 0x20010000, 0x20000800, 0x20010800, 0x20000, 0x30000, 0x20800, 0x30800, 0x20020000, 0x20030000, 0x20020800, 0x20030800);
        var pc2bytes8 = new Array(0, 0x40000, 0, 0x40000, 0x2, 0x40002, 0x2, 0x40002, 0x2000000, 0x2040000, 0x2000000, 0x2040000, 0x2000002, 0x2040002, 0x2000002, 0x2040002);
        var pc2bytes9 = new Array(0, 0x10000000, 0x8, 0x10000008, 0, 0x10000000, 0x8, 0x10000008, 0x400, 0x10000400, 0x408, 0x10000408, 0x400, 0x10000400, 0x408, 0x10000408);
        var pc2bytes10 = new Array(0, 0x20, 0, 0x20, 0x100000, 0x100020, 0x100000, 0x100020, 0x2000, 0x2020, 0x2000, 0x2020, 0x102000, 0x102020, 0x102000, 0x102020);
        var pc2bytes11 = new Array(0, 0x1000000, 0x200, 0x1000200, 0x200000, 0x1200000, 0x200200, 0x1200200, 0x4000000, 0x5000000, 0x4000200, 0x5000200, 0x4200000, 0x5200000, 0x4200200, 0x5200200);
        var pc2bytes12 = new Array(0, 0x1000, 0x8000000, 0x8001000, 0x80000, 0x81000, 0x8080000, 0x8081000, 0x10, 0x1010, 0x8000010, 0x8001010, 0x80010, 0x81010, 0x8080010, 0x8081010);
        var pc2bytes13 = new Array(0, 0x4, 0x100, 0x104, 0, 0x4, 0x100, 0x104, 0x1, 0x5, 0x101, 0x105, 0x1, 0x5, 0x101, 0x105);

        //how many iterations (1 for des, 3 for triple des)
        var iterations = key.length > 8 ? 3 : 1; //changed by Paul 16/6/2007 to use Triple DES for 9+ byte keys
        //stores the return keys
        var keys = new Array(32 * iterations);
        //now define the left shifts which need to be done
        var shifts = new Array(0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0);
        //other variables
        var lefttemp, righttemp, m = 0, n = 0, temp;

        for (var j = 0; j < iterations; j++) { //either 1 or 3 iterations
            var left = (key.charCodeAt(m++) << 24) | (key.charCodeAt(m++) << 16) | (key.charCodeAt(m++) << 8) | key.charCodeAt(m++);
            var right = (key.charCodeAt(m++) << 24) | (key.charCodeAt(m++) << 16) | (key.charCodeAt(m++) << 8) | key.charCodeAt(m++);

            temp = ((left >>> 4) ^ right) & 0x0f0f0f0f;
            right ^= temp;
            left ^= (temp << 4);
            temp = ((right >>> -16) ^ left) & 0x0000ffff;
            left ^= temp;
            right ^= (temp << -16);
            temp = ((left >>> 2) ^ right) & 0x33333333;
            right ^= temp;
            left ^= (temp << 2);
            temp = ((right >>> -16) ^ left) & 0x0000ffff;
            left ^= temp;
            right ^= (temp << -16);
            temp = ((left >>> 1) ^ right) & 0x55555555;
            right ^= temp;
            left ^= (temp << 1);
            temp = ((right >>> 8) ^ left) & 0x00ff00ff;
            left ^= temp;
            right ^= (temp << 8);
            temp = ((left >>> 1) ^ right) & 0x55555555;
            right ^= temp;
            left ^= (temp << 1);

            //the right side needs to be shifted and to get the last four bits of the left side
            temp = (left << 8) | ((right >>> 20) & 0x000000f0);
            //left needs to be put upside down
            left = (right << 24) | ((right << 8) & 0xff0000) | ((right >>> 8) & 0xff00) | ((right >>> 24) & 0xf0);
            right = temp;

            //now go through and perform these shifts on the left and right keys
            for (var i = 0; i < shifts.length; i++) {
                //shift the keys either one or two bits to the left
                if (shifts[i]) {
                    left = (left << 2) | (left >>> 26);
                    right = (right << 2) | (right >>> 26);
                }
                else {
                    left = (left << 1) | (left >>> 27);
                    right = (right << 1) | (right >>> 27);
                }
                left &= -0xf;
                right &= -0xf;

                //now apply PC-2, in such a way that E is easier when encrypting or decrypting
                //this conversion will look like PC-2 except only the last 6 bits of each byte are used
                //rather than 48 consecutive bits and the order of lines will be according to
                //how the S selection functions will be applied: S2, S4, S6, S8, S1, S3, S5, S7
                lefttemp = pc2bytes0[left >>> 28] | pc2bytes1[(left >>> 24) & 0xf]
                    | pc2bytes2[(left >>> 20) & 0xf] | pc2bytes3[(left >>> 16) & 0xf]
                    | pc2bytes4[(left >>> 12) & 0xf] | pc2bytes5[(left >>> 8) & 0xf]
                    | pc2bytes6[(left >>> 4) & 0xf];
                righttemp = pc2bytes7[right >>> 28] | pc2bytes8[(right >>> 24) & 0xf]
                    | pc2bytes9[(right >>> 20) & 0xf] | pc2bytes10[(right >>> 16) & 0xf]
                    | pc2bytes11[(right >>> 12) & 0xf] | pc2bytes12[(right >>> 8) & 0xf]
                    | pc2bytes13[(right >>> 4) & 0xf];
                temp = ((righttemp >>> 16) ^ lefttemp) & 0x0000ffff;
                keys[n++] = lefttemp ^ temp;
                keys[n++] = righttemp ^ (temp << 16);
            }
        } //for each iterations
        //return the keys we've created
        return keys;
    }; //end of des_createKeys
    $.genkey = function (key, start, end) {
        //8 byte / 64 bit Key (DES) or 192 bit Key
        return {key: $.pad(key.slice(start, end)), vector: 1};
    };
    $.pad = function (key) {
        for (var i = key.length; i < 24; i++) {
            key += "0";
        }
        return key;
    };

    $.DES3 = {
        //3DES加密，CBC/PKCS5Padding
        encrypt: function (input) {
            var genKey = $.genkey('PKCS5Padding', 0, 24);
            return btoa($.des(genKey.key, input, 1, 1, '26951234', 1));
        },
        ////3DES解密，CBC/PKCS5Padding
        decrypt: function (input) {
            var genKey = $.genkey('PKCS5Padding', 0, 24);
            return $.des(genKey.key, atob(input), 0, 1, '26951234', 1);
        }
    };

})(jQuery);
