<div id="modal_nuevo_producto" class="modal fade" role="dialog">
  	<div class="modal-dialog">
    	<div class="modal-content">
      		<div class="modal-header">
        		<button type="button" class="close" data-dismiss="modal">&times;</button>
       			<h4 class="modal-title">Producto</h4>
      		</div>
      		<div class="modal-body">
				<form method="POST" enctype="multipart/form-data" id="formProductos">
		  			<div class="input-group">
		    			<span class="input-group-addon"><i class="glyphicon glyphicon-pencil"></i></span>
		    			<input id="inp_nombre" name="inp_nombre" type="text" class="form-control" placeholder="Nombre del producto" >
		  			</div>
					<div class="input-group top_margin">
						<span class="input-group-addon"><i class="glyphicon glyphicon-usd"></i></span>
						<input id="inp_precio" name="inp_precio" type="number" class="form-control"  placeholder="Precio">
					</div>
					<div class="input-group top_margin">
						<span class="input-group-addon"><i class="glyphicon glyphicon-credit-card"></i></span>
						<input id="inp_iva" name="inp_iva" type="number" class="form-control"  placeholder="IVA" autocomplete="off" readonly>
					</div>
					
					<div class="input-group top_margin">
						<span class="input-group-addon"><i class="glyphicon glyphicon-tag"></i></span>
						<input id="inp_total" name="inp_total" type="number" class="form-control"  placeholder="Total" autocomplete="off" readonly>
					</div>
		  		</form>		  
      		</div>
			<div class="modal-footer">
				<button type="submit" class="btn btn-success" id="btn_registrar"><i class="glyphicon glyphicon-floppy-disk"></i> Registrar</button>
				<button type="submit" class="btn btn-success hide" id="btn_actualizar"><i class="glyphicon glyphicon-floppy-disk"></i> Actualizar</button>
				<button type="button" class="btn btn-danger" data-dismiss="modal"><i class="glyphicon glyphicon-trash"></i> Salir</button>
				
			</div>
    </div>
  </div>
</div>
