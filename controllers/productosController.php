<?php

class productosController extends Productos{

	function index(){
		require_once('views/layout/header.php');
		require_once('views/layout/nav.php');
		require_once('views/index/index.php');
		require_once('views/index/modals.php');
		require_once('views/layout/footer.php');
	}

	//Obtener todos los productos
	function get_productos(){
		$productos = parent::get_all_products();
		echo json_encode($productos);
	}

	//guardar productos
	function save_productos(){
		$nombre= trim($_POST['inp_nombre']);
		$precio= (is_numeric(trim($_POST['inp_precio'])))? trim($_POST['inp_precio']) : 0.00;
		$iva= (is_numeric(trim($_POST['inp_iva'])))? trim($_POST['inp_iva']) : 0.00;
		$total= (is_numeric(trim($_POST['inp_total'])))? trim($_POST['inp_total']) : 0.00;

		$data = array(
			'descripcion'=> $nombre,
			'precio'=> $precio,
			'iva'=> $iva,
			'total'=> $total
		);

		parent::insert_productos($data);	
	}

	function update_productos(){
		$id= trim($_POST['id_prod']);
		$nombre= trim($_POST['inp_nombre']);
		$precio= (is_numeric(trim($_POST['inp_precio'])))? trim($_POST['inp_precio']) : 0.00;
		$iva= (is_numeric(trim($_POST['inp_iva'])))? trim($_POST['inp_iva']) : 0.00;
		$total= (is_numeric(trim($_POST['inp_total'])))? trim($_POST['inp_total']) : 0.00;

		$data = array(
			'id'=> $id,
			'descripcion'=> $nombre,
			'precio'=> $precio,
			'iva'=> $iva,
			'total'=> $total
		);

		parent::put_productos($data);
	}
    
	//eliminar un producto
	function eliminar_productos(){		
		$id= trim($_POST['id_prod']);

		parent::delete_productos($id);
    }  
    
}

