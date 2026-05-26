require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const fruitRoutes = require('./routes/fruit.routes');
const saleRoutes = require('./routes/sale.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/fruits', fruitRoutes);
app.use('/api/sales', saleRoutes);

// Swagger Documentation
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
