
<?php
 $cant-$_POST["Cantidad"];

?>



echo('

<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Tienda - Blueley</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      rel="stylesheet"
      type="text/css"
      media="screen"
      href="Estilos/Tienda.css"
    />
    
    </head>

   <body>
  <br><br><br>
  <div class="container"></div>
  <h2>Table de compras</h2>
  <table class="striped">
    <thead>
        <tr>
            <th>Cantidad</th>
           
        </tr>
    </thead>
   <thead>
    <tr>'.$cant.'</tr>
   
   </thead>
   </body> 
</html>
')
