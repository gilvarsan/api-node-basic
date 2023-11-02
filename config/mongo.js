// database.js

const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    const DB_URI = process.env.DB_URI
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión a la base de datos establecida correctamente');
    // Puedes agregar más lógica aquí después de que se establezca la conexión
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
};

module.exports = { dbConnect };
