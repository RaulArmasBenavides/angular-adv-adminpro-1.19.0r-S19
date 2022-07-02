
const getMenuFrontEnd = (role = 'USER_ROLE') => {

    const menu = [
        {
          titulo: 'Dashboard',
          icono: 'mdi mdi-gauge',
          submenu: [
            { titulo: 'Main', url: '/' },
            { titulo: 'Gráficas', url: 'grafica1' },
            { titulo: 'rxjs', url: 'rxjs' },
            { titulo: 'Promesas', url: 'promesas' },
            { titulo: 'ProgressBar', url: 'progress' },
          ]
        },
    
        {
          titulo: 'Mantenimientos',
          icono: 'mdi mdi-folder-lock-open',
          submenu: [
            // { titulo: 'Usuarios', url: 'usuarios' },
            { titulo: 'Hospitales', url: 'hospitales' },
            { titulo: 'Médicos', url: 'medicos' },
            { titulo: 'Centros de Vacunación', url: 'centros' },
            // { titulo: 'Personal', url: 'personal' },
            // { titulo: 'Tiendas', url: 'tiendas' },
            // { titulo: 'Requerimientos', url: 'requerimientos' },
            // { titulo: 'Control', url: 'control' }
          ]
        },
        {
          titulo: 'Dotación',
          icono: 'mdi mdi-folder-lock-open',
          submenu: [
            { titulo: 'Personal', url: 'personal' },
            { titulo: 'Tiendas', url: 'tiendas' },
            { titulo: 'Requerimientos', url: 'requerimientos' },
            { titulo: 'Control', url: 'control' }
          ]
        },
        {
          titulo: 'Asistencias',
          icono: 'mdi mdi-folder-lock-open',
          submenu: [
            { titulo: 'Marcas', url: 'personal' },
            { titulo: 'Asistencias', url: 'tiendas' },
            { titulo: 'Reporte de Asistencias', url: 'requerimientos' },
          ]
        }

      ];

    if ( role === 'ADMIN_ROLE' ) {
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios' })
    }

    return menu;
}

module.exports = {
    getMenuFrontEnd
}
