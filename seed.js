/**
 * Script para poblar la base de datos con datos de prueba
 * Ejecutar este script con: node seed.js
 */

require('dotenv').config();
const Database = require('./database/Database');
const crypto = require('crypto');

// Funciones para hashear contraseñas
function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return salt + ':' + hash;
}

async function seedDatabase() {
    console.log(' Iniciando proceso de poblar la base de datos...\n');

    const db = new Database();

    try {
        await db.connect();
        console.log(' Conectado a la base de datos\n');

        // Limpiar datos existentes
        console.log(' Limpiando datos existentes...');
        await db.query('DELETE FROM frase');
        await db.query('DELETE FROM categoria');
        await db.query('DELETE FROM usuario');
        await db.query('ALTER TABLE frase AUTO_INCREMENT = 1');
        await db.query('ALTER TABLE categoria AUTO_INCREMENT = 1');
        await db.query('ALTER TABLE usuario AUTO_INCREMENT = 1');
        console.log(' Datos limpiados\n');

        // Insertar usuarios
        console.log('👥 Insertando usuarios...');
        const passwordHash = hashPassword('password123');
        const users = [
            ['Juan Pérez', 'juan@example.com', passwordHash, 'admin'],
            ['María García', 'maria@example.com', passwordHash, 'user'],
            ['Carlos López', 'carlos@example.com', passwordHash, 'user'],
            ['Ana Martínez', 'ana@example.com', passwordHash, 'user'],
            ['Luis Rodríguez', 'luis@example.com', passwordHash, 'user']
        ];
        for (const user of users) {
            await db.query(
                'INSERT INTO usuario (nombre, correo_electronico, password_hash, rol) VALUES (?, ?, ?, ?)',
                user
            );
        }
        console.log(' 5 usuarios insertados\n');

        // Insertar categorías
        console.log(' Insertando categorías...');
        const categories = [
            ['Gratitud', 'Frases sobre agradecimiento y reconocimiento de las cosas buenas en la vida'],
            ['Motivación', 'Frases para impulsarte a alcanzar tus metas y superar obstáculos'],
            ['Felicidad', 'Frases sobre la alegría y el bienestar emocional'],
            ['Esperanza', 'Frases que inspiran optimismo y confianza en el futuro'],
            ['Éxito', 'Frases sobre logros, perseverancia y determinación'],
            ['Amor', 'Frases sobre el amor propio y hacia los demás'],
            ['Sabiduría', 'Enseñanzas y reflexiones profundas sobre la vida'],
            ['Superación', 'Frases sobre crecimiento personal y desarrollo'],
            ['Reflexión', 'Pensamientos para meditar y contemplar'],
            ['Inspiración', 'Frases que despiertan la creatividad y los sueños']
        ];
        for (const cat of categories) {
            await db.query(
                'INSERT INTO categoria (nombre, descripcion) VALUES (?, ?)',
                cat
            );
        }
        console.log(' 10 categorías insertadas\n');

        // Insertar frases
        console.log(' Insertando frases...');
        const frases = [
            // Gratitud
            ['La gratitud transforma lo que tenemos en suficiente.', 'Anónimo', null, 'published', 1, 1],
            ['Agradecer es la semilla de la felicidad.', 'Desconocido', null, 'published', 2, 1],
            ['La gratitud abre la puerta al poder, la sabiduría y la creatividad.', 'David Steindl-Rast', null, 'published', 1, 1],
            ['La gratitud no solo es la mayor de las virtudes, sino la madre de todas las demás.', 'Cicerón', null, 'draft', 2, 1],
            
            // Motivación
            ['El único modo de hacer un gran trabajo es amar lo que haces.', 'Steve Jobs', null, 'published', 1, 2],
            ['No te conformes con lo que te alcanza si puedes alcanzar lo que sueñas.', 'Anónimo', null, 'published', 3, 2],
            ['Tu única competencia es contigo mismo. Tu objetivo es ser mejor que ayer.', 'Anónimo', null, 'published', 2, 2],
            ['El secreto de avanzar es empezar.', 'Mark Twain', null, 'draft', 4, 2],
            
            // Felicidad
            ['La felicidad no es un destino, es un camino.', 'Anónimo', null, 'published', 2, 3],
            ['La felicidad está en las pequeñas cosas de la vida.', 'Desconocido', null, 'published', 4, 3],
            ['Sé feliz en este momento. Este momento es tu vida.', 'Omar Khayyam', null, 'published', 1, 3],
            ['La felicidad no depende de lo que tienes, sino de lo que eres.', 'Anónimo', null, 'draft', 5, 3],
            
            // Esperanza
            ['Mantén tus sueños vivos. Entender que para lograr cualquier cosa requiere fe y confianza en ti mismo.', 'Anónimo', null, 'published', 2, 4],
            ['La esperanza es la capacidad de ver la luz a pesar de la oscuridad.', 'Desconocido', null, 'published', 4, 4],
            ['No desesperes, la paciencia es el arte de la esperanza.', 'Vittorio Alfieri', null, 'published', 1, 4],
            
            // Éxito
            ['El éxito es la suma de pequeños esfuerzos repetidos día tras día.', 'Robert Collier', null, 'published', 1, 5],
            ['El éxito no es final, el fracaso no es fatal: lo que cuenta es el coraje de continuar.', 'Winston Churchill', null, 'published', 2, 5],
            ['El éxito consiste en vencer el temor al fracaso.', 'Charles Lindbergh', null, 'published', 3, 5],
            
            // Amor
            ['El amor propio no es egoísta; es necesario.', 'Anónimo', null, 'published', 2, 6],
            ['Amar es encontrar tu propia felicidad en la felicidad del otro.', 'Gottfried Leibniz', null, 'published', 4, 6],
            ['Ámate a ti mismo lo suficiente como para establecer límites saludables.', 'Anónimo', null, 'draft', 3, 6],
            
            // Sabiduría
            ['La sabiduría no viene de la edad, sino de la educación y el aprendizaje.', 'Sócrates', null, 'published', 1, 7],
            ['La mejor sabiduría que existe es conocerse a uno mismo.', 'Galileo Galilei', null, 'published', 2, 7],
            
            // Superación
            ['El éxito no es la ausencia de fracasos, es el coraje de seguir adelante a pesar de ellos.', 'Anónimo', null, 'published', 3, 8],
            ['No esperes por el momento perfecto, comienza con el momento presente.', 'Desconocido', null, 'published', 2, 8],
            
            // Reflexión
            ['La vida es lo que te sucede mientras estás ocupado haciendo otros planes.', 'John Lennon', null, 'published', 2, 9],
            ['Reflexiona sobre tus bendiciones, no sobre tus desgracias.', 'Anónimo', null, 'published', 3, 9],
            
            // Inspiración
            ['Cada día es una nueva oportunidad de ser mejor que ayer.', 'Anónimo', null, 'published', 2, 10],
            ['La inspiración existe, pero tiene que encontrarte trabajando.', 'Pablo Picasso', null, 'published', 1, 10]
        ];

        for (const frase of frases) {
            await db.query(
                'INSERT INTO frase (texto, autor, scheduled_at, status, creado_por, categoria_id) VALUES (?, ?, ?, ?, ?, ?)',
                frase
            );
        }
        console.log(` ${frases.length} frases insertadas\n`);

        // Resumen final
        const [userCount] = await db.query('SELECT COUNT(*) as total FROM usuario');
        const [catCount] = await db.query('SELECT COUNT(*) as total FROM categoria');
        const [phraseCount] = await db.query('SELECT COUNT(*) as total FROM frase');

        console.log(' ¡Base de datos poblada exitosamente!\n');
        console.log(' Resumen:');
        console.log(`    Usuarios: ${userCount.total}`);
        console.log(`    Categorías: ${catCount.total}`);
        console.log(`    Frases: ${phraseCount.total}\n`);
        console.log(' Credenciales para pruebas:');
        console.log('   Email: juan@example.com | admin@example.com');
        console.log('   Password: password123');
        console.log('\n ¡La API está lista para usarse!');

    } catch (error) {
        console.error(' Error al poblar la base de datos:', error.message);
        process.exit(1);
    } finally {
        await db.disconnect();
    }
}

seedDatabase();

