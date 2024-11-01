
// Configuración de la API Key
const apiKey = process.env.API_KEY;

// Middleware para validar la API Key
const validateApiKey = (req, res, next) => {
  const requestApiKey = req.headers['x-store'];
  if (requestApiKey === apiKey) {
    next();
  } else {
    res.status(403).json({ error: "Forbidden: Invalid API Key" });
  }
};

export default validateApiKey;


