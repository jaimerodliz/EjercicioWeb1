$( document ).ready(function() {

    var id_producto=0;
    
    //cargar datos en tabla 
    function load_data(){
        $.ajax({        
            type: 'POST',
            url:   '?c=productos&m=get_productos',
            beforeSend: function () {
                $("#information").html("Procesando, espere por favor...");
            },
            success:  function (response) {
                try{
                    var json = $.parseJSON(response);
                    create_table(json);
                }catch(e){
                    alertify.error("Error: "+ e);
                }
            }
        });
    }
    load_data();

    //crear tabla principal con los datos de los productos
    function create_table(data){
        var html="";
		html+="<table class='table table-bordered'>";
		html+="<thead>";
			html+="<tr>";
				html+="<th>#</th>";
				html+="<th>Descripción</th>";
				html+="<th>Precio</th>";
				html+="<th>IVA</th>";
				html+="<th>Total</th>";
				html+="<th>Opciones</th>";
				html+="</tr>";
			html+="</thead>";
			   html+="<tbody >";
            if(data.length == 0){
                html+="<tr>";
                    html+="<td colspan='6'>No hay productos registrados</td>";
                html+="</tr>";
            }else{
                for(var x=0;x<data.length;x++){
                 html+="<tr data-id='"+data[x]['id']+"' data-descripcion='"+data[x]['descripcion']+"' data-iva='"+data[x]['iva']+"' data-precio='"+data[x]['precio']+"' data-total='"+data[x]['total']+"'>";
                        html+="<td>"+data[x]['id']+"</td>";
                        html+="<td>"+data[x]['descripcion']+"</td>";
                        html+="<td>"+parseFloat(data[x]['precio']).toFixed(2)+"</td>";
                        html+="<td>"+parseFloat(data[x]['iva']).toFixed(2)+"</td>";
                        html+="<td>"+parseFloat(data[x]['total']).toFixed(2)+"</td>";
                        html+="<td>";
                          html+="<div class='btn-group'>";
                            html+="<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>";
                            html+="Seleccionar <span class='caret'></span></button>";
                            html+="<ul class='dropdown-menu' role='menu'>";
                              html+="<li class='btn actualizar'>Actualizar</li>";
                              html+="<li class='btn borrar'>Borrar</li>";
                            html+="</ul>";
                          html+="</div>";
                        html+="</td>";
                    html+="</tr>";
                }
            }
			
			html+="</tbody>";
		html+="</table>";
        $("#information").html(html);
    }

    //limpiar formulario
    function clear_data(){
        id_producto=0;
        $("#inp_nombre").val('');
        $("#inp_precio").val('');
        $("#inp_iva").val('');
        $("#inp_total").val('');
    }

    function validaciones(){
        var val=0;
        if($("#inp_nombre").val().trim()==""){
            val=1;
        }else if($("#inp_precio").val().trim()=="" || $.isNumeric($('#inp_precio').val())==false){
            val=1;
        }
        return val;
    }

    //Alta de productos
    $("#btn_nuevo_producto").on('click',function(){
        clear_data();
        $("#btn_registrar").addClass('hide');
        $("#btn_actualizar").removeClass('hide');
        $("#modal_nuevo_producto").modal("show");
    });

    //guardar nuevo producto
    $("#btn_registrar").on("click",function(){
        if(validaciones()==0){
            var form = $('#formProductos')[0];
            var formData = new FormData(form);
            $.ajax({
                type:"POST",
                url:'?c=productos&m=save_productos',
                data: formData,
                processData: false,
                contentType: false,
                success:function(datos){
                    alertify.success('Se ha registrado con éxito el producto');
                    //limpiar formulario
                    clear_data();
                    $("#modal_nuevo_producto").modal("hide");
                    //recargar datos en tabla principal
                    load_data();
                }
            });
        }else{
            alertify.error("Complete el formulario correctamente");
        }
    });

    //calcular iva en base al precio
    $("#inp_precio").on("keyup",function(){
        console.log($(this).val());
        if($.isNumeric($(this).val())==false){
            $("#inp_iva").val('');
            $("#inp_total").val('');
        }else{
            var iva = $(this).val() * 0.16;
            var total = parseFloat($(this).val()) + iva;

            $("#inp_iva").val(iva.toFixed(2));
            $("#inp_total").val(total.toFixed(2));
        }
    });

    //cargar datos para actualizar
    $("#information").on('click','.actualizar',function(){
        clear_data();
        var producto=$(this).parent().parent().parent().parent();
        //cargar datos
        id_producto=producto.data('id');
        $("#inp_nombre").val(producto.data('descripcion'));
        $("#inp_precio").val(producto.data('precio'));
        $("#inp_iva").val(parseFloat(producto.data('iva')).toFixed(2));
        $("#inp_total").val(parseFloat(producto.data('total')).toFixed(2));

        $("#btn_registrar").addClass('hide');
        $("#btn_actualizar").removeClass('hide');
        $("#modal_nuevo_producto").modal("show");
    });

    //actualizar un producto
    $("#btn_actualizar").on("click",function(){
        if(validaciones()==0){
            //cargar datos para envio
            var form = $('#formProductos')[0];
            var formData = new FormData(form);
            formData.append('id_prod',id_producto);

            //enviar datos por ajax
            $.ajax({
                type:"POST",
                url:'?c=productos&m=update_productos',
                data: formData,
                processData: false,
                contentType: false,
                success:function(datos){
                    alertify.success('Se ha actualizado con éxito el producto');
                    //limpiar formulario
                    clear_data();
                    $("#modal_nuevo_producto").modal("hide");
                    //recargar datos en tabla principal
                    load_data();
                }
            });
        }else{
            alertify.error("Complete el formulario correctamente");
        }
    });

    //eliminar registro
    $("#information").on('click','.borrar',function(){
        //obtener id
        var producto=$(this).parent().parent().parent().parent();
        var id_prod=producto.data('id');
        alertify.confirm('Eliminar', '¿Desea eliminar el producto seleccionado?', function(){ 
            
            var formData = new FormData();
            formData.append('id_prod',id_prod);

            //enviar datos por ajax
            $.ajax({
                type:"POST",
                url:'?c=productos&m=eliminar_productos',
                data: formData,
                processData: false,
                contentType: false,
                success:function(datos){
                    alertify.success('Se ha eliminado con éxito el producto');
                    //recargar datos en tabla principal
                    load_data();
                }
            });
        }, function(){}).set('labels', {ok:'Si', cancel:'No'});
    });


});