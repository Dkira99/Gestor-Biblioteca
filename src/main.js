const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./adapters/inbound/routes/authRoutes');
const sequelize = require('./config/database');
const adminRoutes = require('./adapters/inbound/routes/adminRoutes');
const librarianRoutes = require('./adapters/inbound/routes/librarianRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/api/admin', adminRoutes);
app.use('/api/librarian', librarianRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


connectDB().then(() => {
  sequelize.sync({ alter: true })
    .then(() => {
      console.log('Modelos sincronizados con la base de datos.');
      app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
      });
    })
    .catch(error => console.error('Error al sincronizar los modelos:', error));
});
