import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use(express.json());

const PORT= 3000;

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "USers API",
            version: "1.0.0",
            description: "A simple Express Users API ",
        },
    },
    apis: ["./server.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () =>{
    console.log(`Server is running in http://localhost:${PORT}`);
});

let users=[
    {
        userId:1,
        userName:"Sudipta",
        city:"Helsinborg"
    },
    {
        userId:2,
        userName:"Moumita",
        city:"Lund"
    }
];

/**
 * @swagger
 * /users:
 *  get:
 *      summary: Retrieve a list of all users
 *      description: Retrieve a list of users in the document.
 *      responses:
 *        200:
 *          description: A list of users.
 *          content:
 *            application/json:
 *              schema:
 *              type: array
 *              items:
 *                type: object   
 *                properties:
 *                  userId:
 *                    type: integer
 *                  userName:
 *                    type: string
 *                  city:
 *                    type: string 
 */

app.get("/users",(req,res) =>{


   res.json(users) ;
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Add a new user
 *     requestBody:
 *       require: true
 *       content:
 *       application/json:
 *          schema:
 *            type: object
 *            required:
 *              -userName
 *              -city
 *            properties:
 *              userName:
 *                type: string
 *              city:
 *                type: string
 *    responses:
 *      200:
 *        description: User added successfully.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                userId:
 *                  type: integer
 *                userName:
 *                  type: string
 *                city: 
 *                  type: string
 * 
 */
app.post("/users", (req,res) =>{
    const newUser = {
        userId : users.length + 1,
        userName : req.body.userName,
        city : req.body.city,
    };
    users.push(newUser);
    res.json({ message: "User added successfully!", user: newUser});
});
/**
 * @swagger
 * /users/{userId}:
 * put:
 *   summary: update an existing user.
 *   parameters:
 *      -in: path
 *      name: userId
 *      schema:
 *        type: integer
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              userName:
 *                type: string
 *              city:
 *                type: string
 *      responses:
 *        200:
 *          description: User updated successfully.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  userId:
 *                    type: integer
 *                  userName:
 *                    type: string
 *                  city:
 *                    type: string
 *       404:
 *         description: User not found.
 */
app.put("/users/:userId", (req, res) =>{
    const UserID = parseInt(req.params.userId);
    const user= books.find((b)=> b.userId === UserID);
    if(!book){
      return res.status(404).json({message: "User not found!"}) ;
      }
      user.userName= req.body.userName || book.userName;
      user.city= req.body.city || user.city;
      res.json({ message: "User updated successfully!", user});
});

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Delete a user
 *     parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric userID of the book to delete
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *      404:
 *        description: User not found.
 */

app.delete("/users/:userId",(req,res) =>{
    const UserID = parseInt(req.params.userId);
    users = users.filter((b) => b.userId !== UserID);

    res.json({message : "User deleted successfully!"});
});