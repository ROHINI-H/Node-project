import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

// app.use(bodyParser.json());

const app = new express();

// Creates a new router instance
const router = express.Router();

// any route or middleware defined in router will be active under "/" 
app.use("/", router);

// Middleware function -> it is called after every method
router.use((req, res, next) => {
    console.log("Request", req.method);
    next();
});

// Defines a GET route for "/user"
router.get("/user", (req, res) => {
    console.log("User path on router instance");
    res.send("Hello");
});

function logger(req, res, next) {
    console.log("Logging request");
    next();
}

router.get("/user/:id", logger, (req,res) => {
    console.log("User with same id");
    res.send("user id");
});

app.listen(5100, () => {
    console.log("Server is running on port 5100");
});

app.use(
    (req, res, next) => {
        console.log(req.method);
        next();
    },
    (req, res, next) => {
        console.log("coming to next middleware");
        next();
    }
);

app.get("/", (req, res) => {
    res.send("Learning APIS");
});

const books = [{
    id: 1,
    title: "Rich dad, poor dad",
}, {
    id: 2,
    title: "Alchemist",
}];

// Fetching books data
app.get("/books",aunthenticateUser, (req, res) => {
    res.send(books);
});

app.use(express.json());

app.post("/book", (req, res) => {
    const { title, author, price } = req.body;

    // create the new id for the book
    const newBook = {
        id: Math.random() * 10,
        title: title,
        author: author,
        price: price,
    };

    // push the new book into the books array
    books.push(newBook);
    res.send(books);
});

// updating any particular book by id
app.put("/book/:id", (req, res) => {
    // since we are getting id from the paramter, we use params
    const bookId = req.params.id;

    // find the book in the array
    const book = books.find(book => book.id == bookId);

    // if book not present
    if (!book) {
        return res.status(404).json({ message: "Book with this id does not exist" });
    }

    // To get all the keys(like, title, description) from the book object that is sent over API
    const keys = Object.keys(req.body); // always returns an array

    // Updating the key in the array
    keys.forEach(key => {
        book[key] = req.body[key];
    });

    res.send(books);
});

// Delete any particular book by id
app.delete("/book/:id", (req, res) => {
    // get the book id
    const bookId = req.params.id;

    // finding the book in the array
    const book = books.find(book => book.id == bookId);

    // if book not present
    if (!book) {
        return res.status(404).json({ message: "Book not Found" });
    }

    // fitering the book without the deleted book id
    const filteredBooks = books.filter((book) => book.id != bookId);

    res.send(filteredBooks);
});

app.post("/login", (req,res) => {
    // we are creating jwt token with username
    const user = req.body.username;
    const accessToken = jwt.sign({user: user}, "secretKey", {expiresIn: "1m"});

    res.send({token: accessToken});
});

function aunthenticateUser(req,res,next) {
    const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(" ")[1];

    jwt.verify(authHeader, "secretKey", (err, user) => {
        if(err) {
            return res.status(403).json({message: "Invalid JWT Token"});
        }
        req.user = user;
        next();
    });
}
