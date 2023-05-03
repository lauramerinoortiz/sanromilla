

  <div class="container" id="inscripcion">
      <h1 class="text-center mt-5">INSCRIPCIÓN</h1>
      <form>
          <label class="form-label mt-4" for="nombre">Nombre</label><input class="form-control" type="text" name="nombre">
      
          <label class="form-label mt-4" for="apellidos">Apellidos</label><input class="form-control" type="text" name="apellidos">

          <label class="form-label mt-4" for="genero">Género</label>
          <input class="form-check-input" type="radio" name="genero" id="femenino" checked>
          <label class="form-check-label" for="femenino" id="femenino_l">Femenino</label>
          <input class="form-check-input ms-3" type="radio" name="genero" id="masculino">
          <label class="form-check-label" for="masculino" id="masculino_l">Masculino</label><br>

          <label class="form-label mt-4" for="fecha">Fecha de nacimiento</label><input class="form-control" type="date" name="fecha">

          <label class="form-label mt-4" for="genero">Categoría</label><input class="form-control" type="text" placeholder="Absoluta" disabled>

          <label class="form-label mt-4" for="precio">Precio del dorsal </label><input class="form-control" type="text" placeholder="4€" disabled>

          <label class="form-label mt-4" for="camiseta">Talla de camiseta</label><select class="form-select mt-4 text-center">
            <option>No, gracias</option>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
            <option>XXL</option>
          </select>

          <label class="form-label mt-4" for="dni">DNI</label><input class="form-control" type="text" name="dni">

          <label class="form-label mt-4" for="correo">Correo electrónico</label><input class="form-control" type="email" name="correo">

          <label class="form-label mt-4" for="telefono">Número de teléfono</label><input class="form-control" type="text" name="telefono">

          <label class="form-label mt-4" for="info" id="textarea">Información adicional</label><textarea class="form-control mt-4" rows="4" name="info"></textarea>

            
      </form>
      <div class="container text-center mt-5">
        <a href="index.html"><button class="btn btn-danger me-5">Cancelar</button></a>
        <button class="btn btn-warning ms-5 me-5">Añadir inscripción</button>
        <a href="confirmacion.html"><button class="btn btn-success ms-5 me-5">Aceptar</button></a>
    </div> 
  </div>
