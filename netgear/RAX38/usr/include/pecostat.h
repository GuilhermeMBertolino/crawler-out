/*
 * pecostat.h, version 2.0.2
 */

#define CONFIG_MIPS_MT_SMP
/* needed to include the "vpe_id" definition in
 * arch/mips/include/asm/cpu-info.h
 */

#define PECOSTAT_MINOR 241
#define PECOSTAT_MAJOR  10
/* The PECOSTAT_MAJOR is MISC_MAJOR, i.e. 10, from linux/major.h */

#define CPU34K      1
#define MIPS_34K    CPU34K

#define PECOSTAT_PCINFO_SEEK	1
#define PECOSTAT_VERBOSE_SEEK	2

#define MIPS_HPC_MAX		2
#define MIPS_34K_HPC_MAX	4
#define MIPS_1074K_HPC		4
#define MIPS_1004K_CORE_MAX	8
/* Assuming: Up to 8 cores, 2 VPEs per core */
#define MIPS_MAX_VPS           16
#define MIPS_MAX_CM_PERFCTR	8

#define SETBIT(reg,pos,val)  (reg=(reg&~(1<<pos))|(val<<pos))
#define GETBIT(reg,pos)  ((reg&(1<<pos))>>pos)

typedef struct info_struct {
    int vp_type;
    int nvp;
    int VPpc;
    int perf_count;
    int CMpc;
    int cmperf_count;
    int events_count;
    unsigned flags;
} PECOSTAT_INFO;

typedef struct pcinfo_vp {
    unsigned int vptype;
    unsigned int processor_id;
    unsigned int fpu_id;
    int core;
    int pct;
    int nvpe; /* VPEs for this processor */
    int vpe_id; /* VPE_ID for this VP */
    int ntc; /* TCs for this VP */
    int npc;  /* number of performance counters for this VP */
    int ccres; /* the CCRes multiplier */
    unsigned int config1; /* the Config1 register */
    unsigned int config2; /* the Config2 register */
    unsigned int config3; /* the Config3 register */
} PCINFO_VP;

typedef struct pconf_struct {
    unsigned int gcr; /* Global Config Register content */
    int ncore;
    int niocu;
    unsigned int gcr_revision; /* GCR Revision Register content: at GCB+0x0030 */
    unsigned int gic_status; /* GIC Status Register content: at GCB+0x00D0 */
    unsigned int cache_revision; /* Cache Revision content: at GCB+0x00E0 */
    unsigned int iocu_revision; /* IOCU Revision content: at GCB+0x0200 */
    unsigned int clocal_release; /* Core Local Reset Release: at CLCB+0x0000 */
    unsigned int clocal_config; /* Core Local ID: at CLCB+0x0010 */
    unsigned int clocal_core_other; /* Core Local ID: at CLCB+0x0018 */
    unsigned int clocal_id; /* Core Local ID: at CLCB+0x0028 */
    unsigned int cother_release[MIPS_1004K_CORE_MAX];
                            /* Core Local Reset Release: at COCB+0x0000 */
    unsigned int cother_config[MIPS_1004K_CORE_MAX];
                            /* Core Local ID: at COCB+0x0010 */
    unsigned int cother_core_other[MIPS_1004K_CORE_MAX];
                            /* Core Local ID: at COCB+0x0018 */
    unsigned int cother_id[MIPS_1004K_CORE_MAX];
                            /* Core Local ID: at COCB+0x0028 */
} PECOSTAT_CONFIG;

typedef struct pcinfo_struct {
    char version[16];
    unsigned int prid;
    unsigned int vpmask; /* limits VPs to 32 */
    int nvp;
    PCINFO_VP vpinfo[MIPS_MAX_VPS];
    int ncore;
    int cm_npc; /* number of performance counters for the Coherence Manager */
    unsigned flags;
} PECOSTAT_PCINFO;

typedef struct cm_counter {
    unsigned counter_on : 1;
    unsigned counter_reset : 1;
} CM_COUNTER;

/* the CM Performance Counter Control Register Format
 * See MD00577 Figure A-2
 */
typedef union cm_pccr {
    struct {
        unsigned   perf_num_cnt : 4;
        unsigned   CC_CountOn   : 1;
        unsigned   CC_Reset     : 1;
        unsigned   cm_ctr0_on   : 1;
        unsigned   cm_ctr0_reset : 1;
        unsigned   cm_ctr1_on   : 1;
        unsigned   cm_ctr1_reset : 1;
        unsigned   cm_ctr2_on   : 1;
        unsigned   cm_ctr2_reset : 1;
        unsigned   cm_ctr3_on   : 1;
        unsigned   cm_ctr3_reset : 1;
        unsigned   cm_ctr4_on   : 1;
        unsigned   cm_ctr4_reset : 1;
        unsigned   cm_ctr5_on   : 1;
        unsigned   cm_ctr5_reset : 1;
        unsigned   cm_ctr6_on   : 1;
        unsigned   cm_ctr6_reset : 1;
        unsigned   cm_ctr7_on   : 1;
        unsigned   cm_ctr7_reset : 1;
        unsigned   dummy1       : 7;
        unsigned   perf_overflow_stop : 1;
        unsigned   perf_overflow_interrupt : 1;
        unsigned   bit31 : 1;
    } bits;
    unsigned long value;
} CM_PCCR;

/* the CM Performance Counter Event Select Register 0/1 Format
 * See MD00577 Figure A-4
 */
typedef union cmperf_ctr {
    struct {
        unsigned char   Px_event[4];
        /* Px_event[0] is P0_event, Px_event[1] is P1_event, etc */
    } events;
    unsigned long long value;
} CMPERF_CTR;


/* the definitions below of CONFIG7_PCT and CONFIG7_PCT_SHIFT should be placed
 * either in mipsmtregs.h of in mipsregs.h
 */
#define CONFIG7_PCT_SHIFT	19
#define CONFIG7_PCT		(_ULCAST_(1) << CONFIG7_PCT_SHIFT)
/* #define read_tc_c0_prid()	mftc0(15, 0) */
#define read_tc_c0_perfctl0()    mftc0(25, 0)
#define read_tc_c0_perfctl1()    mftc0(25, 2)
#define read_tc_c0_perfctl2()    mftc0(25, 4)
#define read_tc_c0_perfctl3()    mftc0(25, 6)

#define write_tc_c0_perfctl0(val)    mttc0(25, 0, val)
#define write_tc_c0_perfctl1(val)    mttc0(25, 2, val)
#define write_tc_c0_perfctl2(val)    mttc0(25, 4, val)
#define write_tc_c0_perfctl3(val)    mttc0(25, 6, val)

#define read_tc_c0_perfctr0()    mftc0(25, 1)
#define read_tc_c0_perfctr1()    mftc0(25, 3)
#define read_tc_c0_perfctr2()    mftc0(25, 5)
#define read_tc_c0_perfctr3()    mftc0(25, 7)

#define write_tc_c0_perfctr0(val)    mttc0(25, 1, val)
#define write_tc_c0_perfctr1(val)    mttc0(25, 3, val)
#define write_tc_c0_perfctr2(val)    mttc0(25, 5, val)
#define write_tc_c0_perfctr3(val)    mttc0(25, 7, val)

#define PERFCTL_M_MASK	0x80000000

/* Global Control Block */
#define GCB_OFFSET	0xbfbf8000
/* Global Debug Block: GDB_OFFSET is GCB_OFFSET + 0x6000 */
#define GDB_OFFSET	0xbfbfe000
/* CM Performance Counter Control Register is GDB_OFFSET + 0x100 */
#define CM_PCCR_OFFSET	0xbfbfe100
/* CM Performance Counter Event Select Register 0 is GDB_OFFSET + 0x130 */
#define CM_PCESR0_OFFSET	0xbfbfe130
/* CM Performance Counter Event Select Register 1 is GDB_OFFSET + 0x138 */
#define CM_PCESR1_OFFSET	0xbfbfe138
/* CM Performance Cycle Counter Register is GDB_OFFSET + 0x180 */
#define CM_PERFCC	0xbfbfe180
/* CM Performance Counter 0 Qualifier Register: CM_PERFCTR0_QR_OFFSET
 *   is GDB_OFFSET + 0x190 */
#define CM_PERFCTR0_QR_OFFSET	0xbfbfe190
/* CM Performance Counter 0: CM_PERFCTR0_OFFSET is GDB_OFFSET + 0x198 */
#define CM_PERFCTR0_OFFSET	0xbfbfe198

/* Core-Local Control Block */
#define CLCB_OFFSET	0xbfbfa000

/* Core-Other Control Block */
#define COCB_OFFSET	0xbfbfc000
