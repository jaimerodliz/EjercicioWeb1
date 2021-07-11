<?php
class Productos extends db{

	//obtener todos los productos
	function get_all_products(){
		try {
			$SQL = "SELECT * FROM productos";
			$result = $this->connect()->prepare($SQL);
			$result->execute();
			return $result->fetchAll(PDO::FETCH_OBJ);	
		}catch (Exception $e) {
			die($e->getMessage());
		}
	}

	//guardar los productos
	function insert_productos($data){
		try {
			$SQL = 'INSERT INTO productos (descripcion,precio,iva,total) VALUES (?,?,?,?)';
			$result = $this->connect()->prepare($SQL);
			$result->execute(array(
				$data['descripcion'],
				$data['precio'],
				$data['iva'],
				$data['total']
			));			
		}catch (Exception $e) {
			die($e->getMessage());
		}
	}

	//actualizar productos
	function put_productos($data){
		try {
			$SQL = 'UPDATE productos SET descripcion = ?,precio = ?,iva = ?,total = ? WHERE id = ?';
			$result = $this->connect()->prepare($SQL);
			$result->execute(array(
				$data['descripcion'],
				$data['precio'],
				$data['iva'],
				$data['total'],
				$data['id']
			));			
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	//eliminar un producto
	function delete_productos($id){
		try {
			$SQL = 'DELETE FROM productos WHERE id = ?';
			$result = $this->connect()->prepare($SQL);
			$result->execute(array(
				$id
			));			
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}	
}
?>