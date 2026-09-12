import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 3001;

// Start server
app.listen(PORT, () => {
  console.log(`KarigarSetu Full-Stack Unified Platform running on port ${PORT}`);
});
