const jwt = require('jsonwebtoken');

export const generarJWT = (uid: string = ''): Promise<string> => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.JWT_SECRET || 'your-secret-key', {
            expiresIn: '4h',
        }, (err: Error | null, token: string | undefined) => {
            if (err) {
                console.log(err);
                reject('Error al generar el Token');
            } else {
                resolve(token || ''); // Asegúrate de manejar el caso donde token sea undefined
            }
        });
    });
};