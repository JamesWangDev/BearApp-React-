import app from "./app";
import connectToDB from "./database";

const PORT = process.env.PORT || 5000;

connectToDB();

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
