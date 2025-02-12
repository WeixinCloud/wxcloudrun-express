const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { init: initDB, Counter } = require("./db");

const app = express();

// Middleware to parse URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// Serve the index.html file at the root for testing the web interface
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ------------------------
// Existing Endpoint: Counter Example
// ------------------------

// Update counter (POST /api/count)
app.post("/api/count", async (req, res) => {
  const { action } = req.body;
  if (action === "inc") {
    await Counter.create();
  } else if (action === "clear") {
    await Counter.destroy({ truncate: true });
  }
  res.json({ code: 0, data: await Counter.count() });
});

// Get current counter (GET /api/count)
app.get("/api/count", async (req, res) => {
  const result = await Counter.count();
  res.json({ code: 0, data: result });
});

// ------------------------
// New Endpoints for Mini‑Program
// ------------------------

// GET /api/getUser
// Expects a query parameter "code"; returns dummy user data (replace with actual WeChat API call if needed)
app.get("/api/getUser", (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.status(400).json({ code: 400, message: "Missing code parameter" });
  }
  // Dummy response – replace with real API call to WeChat if needed.
  res.json({
    code: 200,
    data: {
      openid: "dummy_openid_" + code,
      userInfo: {
        nickname: "Demo User",
        avatarUrl: "https://example.com/avatar.jpg"
      }
    }
  });
});

// GET /api/getCarouselImages
// Returns an array of image URLs for the carousel banner
app.get("/api/getCarouselImages", (req, res) => {
  // Replace these URLs with your actual image URLs (or generate them dynamically)
  const images = [
    "https://express-n030-139348-4-1340644958.sh.run.tcloudbase.com/images/carusel/61121.jpg",
    "https://express-n030-139348-4-1340644958.sh.run.tcloudbase.com/images/carusel/61137.jpg",
    "https://express-n030-139348-4-1340644958.sh.run.tcloudbase.com/images/carusel/61138.jpg",
    "https://express-n030-139348-4-1340644958.sh.run.tcloudbase.com/images/carusel/61140.jpg"
  ];
  res.json({ code: 200, data: images });
});

// GET /api/getHotList
// Returns a list of hot items (dummy data; implement your own logic as needed)
app.get("/api/getHotList", (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  // Dummy data for demonstration:
  const list = [
    { id: 1, title: "Hot Product 1", price: "11.00", img: "https://express-n030-139348-4-1340644958.sh.run.tcloudbase.com/images/product1.jpg" },
    { id: 2, title: "Hot Product 2", price: "16.00", img: "https://express-n030-139348-4-1340644958.sh.run.tcloudbase.com/images/product2.jpg" }
  ];
  res.json({ code: 200, data: { list } });
});

// GET /api/getItem
// Returns product details for a given product ID
app.get("/api/getItem", (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ code: 400, message: "Missing id parameter" });
  }
  // Dummy product detail response:
  res.json({
    code: 200,
    data: {
      id,
      title: "Product " + id,
      price: "11.00",
      spec: "Sample spec",
      images: [
        "https://express-n030-139348-4-1340644958.sh.run.tcloudbase.com/images/product_detail.jpg"
      ],
      sales: 100,
      free_shipping: 1,
      shipping_fee: "0.00",
      detailContent: "Detailed description for product " + id,
      afterSale: "After-sale information for product " + id
    }
  });
});

// POST /api/addCart
// Simulates adding a product to the shopping cart
app.post("/api/addCart", (req, res) => {
  const { id, num, spec, title, img, price } = req.body;
  if (!id) {
    return res.status(400).json({ code: 400, message: "Missing id parameter" });
  }
  // For demonstration, we simply return a success message.
  res.json({ code: 200, message: "Item added to cart" });
});

// ------------------------
// Start Server
// ------------------------
const port = process.env.PORT || 80;
async function bootstrap() {
  // Initialize database (if needed)
  await initDB();
  app.listen(port, () => {
    console.log("Express app listening on port", port);
  });
}
bootstrap();
