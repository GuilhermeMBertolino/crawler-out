
function TreeItem_class()
{
	this.parent = null ;
	this.level = 0 ;
	this.caption = '' ;
	this.selected = false ;
	this.expanded = false ;
	this.firstChild = null ;
	this.lastChild = null ;
	this.next = null ;
	//--customized data
	this.data = null ;
}

function Tree_NewRoot()
{
	var root = new TreeItem_class();
	root.caption = 'ROOT' ;
	return root ;
}

function Tree_GetRoot( item )
{
	var tmp ;
	if( item==null ) return null ;

	tmp = item ;
	while( item != null ){
		tmp = item ;
		item = item.parent ;
	}
	return tmp ;
}

var show_alert=false;
function Tree_AddItem( parent, caption, data )
{
	if( parent == null && !show_alert ){
		show_alert=true;
		alert('parent item is null. Please close browser and re-open.');
		return null ;
	}
	var item = new TreeItem_class();

	item.parent = parent ;
	item.caption = caption ;
	item.data = data ; //--customized data
	if( item.parent != null ){
		item.level = item.parent.level + 1;
		if(item.parent.firstChild == null)
			item.parent.firstChild = item ;
		if(item.parent.lastChild != null)
			item.parent.lastChild.next = item ;
		item.parent.lastChild = item ;
	}
	return item ;
}


function Tree_print2( root )
{
	if(root == null)  return ;

	var item = Tree_GetNextItem( root ) ;
	while( item != null ){
		document.write( 'Level '+ item.level + ': '+ item.caption +'<br>') ;

		item = Tree_GetNextItem( item ) ;
	}

}

function Tree_print( root )
{
	if(root == null)  return ;

	var item = root.firstChild ;
	while( item != null ){
		document.write( 'Level '+ item.level + ': '+ item.caption +'<br>') ;

		if( item.firstChild != null )
			Tree_print( item ) ;
		item = item.next ;
	}
}

//--------------------------------------------------------------
function Tree_GetNextItem( item )
{
	// depth first
	if( item == null ) return null ;
	if( item.firstChild != null )  return item.firstChild ;
	if( item.next != null )  return item.next ;

	var result = item.parent ;
	while( result != null ){  // search parent's next item
		if( result.next != null ) return result.next ;
		result = result.parent ;
	}
	return result ;
}

function Tree_SetAllItemSelected( root, value )
{
	if( root == null )  return;

	var item = root ;
	item = Tree_GetNextItem( item ) ;
	while( item != null ){
		item.selected = value ;
		item = Tree_GetNextItem( item ) ;
	}
}

function Tree_SetAllItemExpanded( root, value )
{
	if( root == null )  return;

	var item = root ;
	item = Tree_GetNextItem( item ) ;
	while( item != null ){
		item.expanded = value ;
		item = Tree_GetNextItem( item ) ;
	}
}

function Tree_SetSelectedItem( item, value )
{
	var root = Tree_GetRoot( item ) ;

	Tree_SetAllItemSelected( root, false ) ;
	//Tree_SetAllItemExpanded( root, false ) ;

	if( item != null )	item.selected = value ;
	else				return ;

	if( value ){
		while( item != null ){ // expand all parent items
			item.expanded = value ;
			item = item.parent ;
		}
	}

}

