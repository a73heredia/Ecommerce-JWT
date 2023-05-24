// import { Router } from 'express';
// import UserModel from '../../models/user.js';
// import { createHash, validatePassword } from '../../utils/hashFunctions.js';
// import passport from 'passport';

// const router = Router();

// router.post('/login', async(req, res) => {
//     const { 
//         body: {
//             email,
//             password
//         } 
//     } = req;
    
//     if(!email || !password){
//         return res.render('login', { error: 'Todo los campos debe venir en la solicitud.' });
//     }
//     const user = await UserModel.findOne({email});

//     if(!user){
//         return res.render('login', { error: 'Email o password invalido.' })
//     }

//     // if(user.password !== password){
//     //     return res.status(400).json({message: 'Usuario no encontrado'});
//     // }

//     if(!validatePassword(password, user)){
//         return res.render('login', { error: 'Email o password invalido.' });
//     }

//     req.session.user = user;
//     res.redirect('/profile');
// });

// router.post('/register',passport.authenticate('register', { failureRedirect: '/register'}),(req, res) => {
//     res.redirect('/login')
// });


// router.get('/logout', (req, res) => {
//         req.session.destroy(error => {
//           if (!error) {
//             res.redirect('/login')
//           } else {
//             res.send({status: 'Logout Error', body: error })
//           }
//         })
// });

// router.post('/reset-password', async(req, res) => {
//     const {
//         body: {
//             email,
//             password
//         }
//     } = req;

//     if(!email || !password){
//         return res.render('reset-password', {error: 'Todos los campos deben ser completados'});
//     }

//     const user = UserModel.find({email});

//     if(!user){
//         return res.render('reset-password', {error: 'El email no existe'});
//     }

//     //user.password = createHash(password);
//     //await UserModel.updateOne({email}, user);

//     await UserModel.updateOne({email}, {$set: {password: createHash(password)}})

//     res.redirect('/login');
// });

// router.get('/github/callback', passport.authenticate('github', {failureRedirect: '/login'}), (req, res) => {
//     req.session.user = req.user
//     res.redirect('/profile')
// })

// export default router;