

//función para mostrar las tareas
function mostrarTareas() {
    //obtenerlas del local storage o mostrar array vacío si no hay tareas
    const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || [];
    const tareasPendientesUl = document.getElementById('tareasPendientes');
    const tareasCompletadasUl = document.getElementById('tareasCompletadas');

    //limpiar las listas del DOM
    tareasPendientesUl.innerHTML = '';
    tareasCompletadasUl.innerHTML = '';

    tareasGuardadas.forEach((tarea, index) => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarea.completada;

        checkbox.onchange = () => completarTarea(index, !tarea.completada);

        const label = document.createElement('label');
        label.textContent = tarea.tarea;

        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar';
        eliminarBtn.onclick = () => eliminarTarea(index);

        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(eliminarBtn);

        if (tarea.completada) {
            tareasCompletadasUl.appendChild(li);
        } else {
            tareasPendientesUl.appendChild(li);
        }

    });
}

//agregar tarea nueva

function agregarTarea() {
    const nuevaTareaInput = document.getElementById('nuevaTarea');
    const nuevaTarea = nuevaTareaInput.value.trim();

    if (nuevaTarea !== '') {
        const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || [];
        const nuevaTareaObj = { tarea: nuevaTarea, completada: false };

        tareasGuardadas.push(nuevaTareaObj);

        localStorage.setItem('tareas', JSON.stringify(tareasGuardadas));

        //limpiar el campo de input
        nuevaTareaInput.value = '';
        mostrarTareas();
        focoInput.focus();

    }
}
//escuchador para click
let agregarTareaBtn = document.getElementById('boton1');
agregarTareaBtn.addEventListener('click', ()=> agregarTarea());

//escuchador para tecla Enter
let agregarTareaEnter = document.getElementById('nuevaTarea');
agregarTareaEnter.addEventListener('keydown', (e)=>{
    if (e.keyCode===13){
        agregarTarea();
        focoInput.focus();
    }
})


//marcar tarea como completada
function completarTarea(index, estado) {
    const tareasGuardadas = JSON.parse(localStorage.getItem('tareas'));
    tareasGuardadas[index].completada = estado;

    localStorage.setItem('tareas', JSON.stringify(tareasGuardadas));
    mostrarTareas();
}

//eliminar una tarea
function eliminarTarea(index) {
    const tareasGuardadas = JSON.parse(localStorage.getItem('tareas'));
    tareasGuardadas.splice(index, 1);

    localStorage.setItem('tareas', JSON.stringify(tareasGuardadas));
    mostrarTareas();
    focoInput.focus();
}

mostrarTareas()
//hacemos foco en el input
let focoInput = document.getElementById('nuevaTarea');
focoInput.focus();