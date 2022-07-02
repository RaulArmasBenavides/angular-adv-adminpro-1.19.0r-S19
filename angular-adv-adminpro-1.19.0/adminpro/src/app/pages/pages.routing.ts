import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';
import { CentrosComponent } from './mantenimientos/centros/centros.component';
import { PersonalComponent } from './dotacion/personal/personal.component';
import { RequerimientoComponent } from './dotacion/requerimiento/requerimiento.component';
import { TiendasComponent } from './dotacion/tiendas/tiendas.component';
import { TiendaComponent } from './dotacion/tiendas/tienda.component';
import { ControlComponent } from './dotacion/control/control.component';



const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' }},
            { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busquedas' }},
            { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica #1' }},
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' }},
            { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' }},
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }},
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' }},

            // Mantenimientos
            { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Matenimiento de Hospitales' }},
            { path: 'medicos', component: MedicosComponent, data: { titulo: 'Matenimiento de Medicos' }},
            { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Matenimiento de Medicos' }},
            { path: 'centros', component: CentrosComponent, data: { titulo: 'Centros de vacunación' }},
            { path: 'personal', component: PersonalComponent, data: { titulo: 'Personal dotación' }},
            { path: 'tiendas', component: TiendasComponent, data: { titulo: 'Tiendas Tambo' }},
            { path: 'tienda/:idTienda', component: TiendaComponent, data: { titulo: 'Matenimiento de Tienda' }},
            { path: 'control', component: ControlComponent, data: { titulo: 'Control de dotación' }},
            //formularios 
            { path: 'requerimientos', component: RequerimientoComponent, data: { titulo: 'Requerimientos'}},
            // Rutas de Admin
            { path: 'usuarios', canActivate: [ AdminGuard ], component: UsuariosComponent, data: { titulo: 'Matenimiento de Usuarios' }},
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


