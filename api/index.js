const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const nodemon = require("nodemon");
const cors = require("cors");

const app = express();
const port = 19000;

app.get("/", (req, res) => res.send("Hello World"));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

mongoose
  .connect(
    "mongodb+srv://tounkarakan:Diagui223@cluster0.pcusciy.mongodb.net/",
    // "mongodb://127.0.0.1/firstMongoDBProject",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connecté à MongoDB");
  })
  .catch((err) => {
    console.log("Erreur de connexion", err);
  });

app.listen(port, "127.0.0.1", () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});

const User = require("./models/user");
const Order = require("./models/order");

// Fonction d'envoie d'un email de vérification à l'utilisateur
const sendVerificationEmail = async (email, verificationToken) => {
  // Crée un transporteur de nodemailer
  const transporter = nodemailer.createTransport({
    // Configuration de l'email
    service: "gmail",
    auth: {
      user: "tounkaradiagui@gmail.com",
      pass: "vogwkldlxwopywnp",
    },
  });

  //Initialiser le message
  const mailOptions = {
    from: "diagui-shop.com",
    to: email,
    subject: `Vérification de votre compte sur diagui-shop`,
    text: `Bonjour, Veuillez cliquer sur ce lien pour valider votre adresse e-mail:
    http://127.0.0.1:19000/verify/${verificationToken}`,
  };

  // Envoyer l'email à l'utilisateur
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Erreur d'envoie de message de vérification", error);
  }
};

// endpoint to register in the app
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //Vérifier si l'email existe dans la BD
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email déjà utilisé" });
      // return res.status(409).send('Email déjà utilisé');
    }

    // Crée un nouvel utilisateur
    const newUser = new User({ name, email, password });

    // Générer et enregistrer le token de vérification
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    // Enregistrer l'utilisateur dans la base de données
    await newUser.save();

    // Envoyer un email de vérification à l'utilisateur inscrit
    sendVerificationEmail(newUser.email, newUser.verificationToken);
    // res.redirect("/login")

    res
      .status(200)
      .json({ message: "Inscription effectuée, Verifiez votre email" });
  } catch (error) {
    console.log("Erreur d'inscription", error);
    res
      .status(500)
      .json({ message: "Inscription echouée, veuillez réessayer" });
  }
});

// Endpoint to verify the email
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;
    // Trouver l'utilisateur avec le token correspondant
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Le lien est expiré ou n'est pas valide" });
    }

    // Utilisateur déjà vérifié
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: "Votre adresse email a été vérifié !" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors du verifcation", error });
  }
  // if(!user){
  //   return   res.render("pages/fail-page" ,{"title":"Page non trouvée"});
  // };
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};
const secretKey = generateSecretKey();
console.log(`Secret Key : ${secretKey}`);

// Endpoint to Login user
// app.post("/login", async(req,res) => {
//   try {
//     const {email, password} = req.body;
//     const user = await  User.findOne({"email":email}).select("+password +verified").exec();
//     if(!user){
//       return res.status(401).json('Utilisateur inconnue');
//     }
//     // Vérifier si le mot de passe est correct ou non
//     if(user.password !== password){
//       return res.status(401).json('Mot de Passe Incorrect');
//     }
//     // Générer un token après la connexion
//     const token = jwt.sign({
//       userId:user._id
//     }, crypto.createSecretKey);

//     res.status(200).json({token});

//   } catch (error) {
//     res.status(500).json({message:"Erreur de connexion"});
//   }
// });

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //Verifier si l'utilisateur existe:
    const users = await User.findOne({ email });
    if (!users) {
      return res
        .status(404)
        .json({ message: "Email ou Mot de Passe Incorrecte" });
    }
    //Verifier si le mot passe est incorrect
    if (users.password !== password) {
      return res.status(404).json({ message: "Mot de Passe Incorrecte!" });
    }
    // Générer un Token si toutes les informations sont correctes
    const token = jwt.sign({ userId: users._id }, secretKey);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Erreur de connexion" });
  }
});
