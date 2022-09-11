const { response } = require('express');

const Notificacion = require('../models/notificacion');


const getNotificaciones = async(req, res = response) => {

    const notificaciones = await Notificacion.find();
                                   // .populate('usuario','nombre img');

    res.json({
        ok: true,
        notificaciones
    })
}

const crearNotificacion = async(req, res = response) => {

    // const uid = req.uid;
    const notificacion = new Notificacion({ 
        // usuario: uid,
        ...req.body 
    });

    try {
        
        const notificacionDB = await notificacion.save();
        res.json({
            ok: true,
            notificacion: notificacionDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error'
        })
    }

}

const actualizarNotificacion = async (req, res = response) => {

    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const notificacion = await Notificacion.findById( id );

        if ( !notificacion ) {
            return res.status(404).json({
                ok: true,
                msg: 'Notificación no encontrada por id',
            });
        }

        const cambiosNotificacion = {
            ...req.body,
            usuario: uid
        }

        const NotificacionActualizada = await Notificacion.findByIdAndUpdate( id, cambiosNotificacion, { new: true } );


        res.json({
            ok: true,
            hospital: NotificacionActualizada
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const borrarNotificacion = async(req, res = response) => {

    const id  = req.params.id;

    try {
        
        const notificacion = await Notificacion.findById( id );

        if ( !notificacion ) {
            return res.status(404).json({
                ok: true,
                msg: 'Notificación no encontrado por id',
            });
        }

        await Notificacion.findByIdAndDelete( id );


        res.json({
            ok: true,
            msg: 'Notificación eliminada'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const getNotificacionById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const notif = await Notificacion.findById(id);
                                    // .populate('usuario','nombre img')
                                    // .populate('hospital','nombre img');
    
        res.json({
            ok: true,
            notif
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}


module.exports = {
    getNotificaciones,
    crearNotificacion,
    actualizarNotificacion,
    borrarNotificacion,
    getNotificacionById
}