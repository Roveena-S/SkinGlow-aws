const productModel = require("../model/Product");

exports.getProduct = async(req, res) => {
    try {
        const product = await productModel.find();
        res.json(product)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

exports.postProduct = async(req, res) => {
    const { name, description, image, price } = req.body;
    try {
       const newProduct = new productModel({ name, description, image, price });
       await newProduct.save();
    res.status(201).json(newProduct); 
    } catch (error) {
        console.error("error in posting");
    res.status(500).json({ error: 'Server error' }); 
    }
}

exports.seedProducts = async(req, res) => {
    try {
        await productModel.deleteMany({});
        const products = [
            { name: "Ethiglo skin brightening and Even Tone Face Wash", price: 494, image: "https://images-static.nykaa.com/media/catalog/product/f/7/f7c0916ETHIG00000004-an_1.jpeg?tr=w-500", description: "Deep cleansing, skin brightening." },
            { name: "Dr.Sheth's Haldi & Hyaluronic Acid Oil-Free Moisturizer", price: 321, image: "https://images-static.nykaa.com/media/catalog/product/d/9/d9720acDRSHE00000058_1a.jpg?tr=w-500", description: "Brightens skin and reduces pigmentation." },
            { name: "Dr.Sheth's Waterproof Mineral Sunscreen 50g", price: 699, image: "https://www.drsheths.com/cdn/shop/files/27.jpg?v=1689311556", description: "Waterproof Sunscreen with 0 WhiteCast." },
            { name: "Plum 3% Niacinamide and Rice Water Alcohol-Free toner", price: 396, image: "https://media6.ppl-media.com/tr:h-235,w-235,c-at_max,l-image,i-Best_seller_700x700base_gUMVzNGWt_.png,lfo-top_right,l-end,dpr-2/static/img/product/396714/plum-3-percentage-niacinamide-toner-with-rice-water-150-ml-91_11_display_1764226121_160d289c.jpg", description: "Balances skin pH and adds hydration." },
            { name: "Minimalist 2% Granactive Retinoid Anti Aging Face Cream", price: 1299, image: "https://images-static.nykaa.com/media/catalog/product/1/6/16b80dcMINIM00000006_1.jpg", description: "Promotes skin elasticity and reduces wrinkles." },
            { name: "Plum Green Tea Pore Cleansing Face Wash for Acne", price: 349, image: "https://plumgoodness.com/cdn/shop/files/GT-FW-100ml_Amazon_1001x1001_02.jpg?v=1754657546&width=900", description: "Controls acne and removes excess oil." },
            { name: "Chemist at Play Exfoliating Body Wash with Lactic Acid", price: 359, image: "https://innovist.com/cdn/shop/files/First_Image_Guides_copy_2_3x_1879e414-8ce5-4d69-b04d-a8038a5b519b_1_1.jpg?v=1756540569", description: "Effective solution for dull,rough,or bumpy skin." },
            { name: "Plum Vanilla Caramello Body Lotion by Plum BodyLovin'", price: 475, image: "https://discoveringbrands.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0390%2F2985%2Ffiles%2FVCBodylotion_90ml_Listingimage_1.jpg%3Fv%3D1761746893&w=625&q=75", description: "Deep Moisture,Warm & Cozy Vanilla Fragrance " },
            { name: "Dot & Key Gloss Boss Lipbalm SPF 50+ Strawberry Crush", price: 199, image: "https://www.dotandkey.com/cdn/shop/files/1e.jpg?v=1760127117&width=700", description: "Moisturizes lips with fruity fragrance." },
            { name: "L'Oréal Paris Hyaluron Pure 72H Purifying Shampoo", price: 230, image: "https://www.lorealparis.co.in/-/media/project/loreal/brand-sites/oap/apac/in/local-products/hair/hair-care/ha-pure/hyaluron-pure-shampoo.jpg?cx=0.49&cy=0.42&cw=500&ch=500&hash=913EB07B4201AC750CE1FE371CAA6CDF", description: "Exfoliates dead skin cells." },
            { name: "Foxtale De-Tan Face Mask for Glowing Skin| Clay Mask with Lactic Acid", price: 499, image: "https://m.media-amazon.com/images/I/51b++aqyUzL._AC_UF1000,1000_QL80_.jpg", description: "Removes impurities and tightens pores." },
            { name: "Minimalist Vitamin K + Retinal 1% Eye Cream", price: 474, image: "https://m.media-amazon.com/images/I/51PpJZ9MNfL.jpg", description: "Reduces dark circles and puffiness." },
            { name: "Aqualogica Refresh+ Dewy Floral Kiss Perfume Body Mist", price: 499, image: "https://aqualogica.in/cdn/shop/files/1_e1556ac3-eba3-42e7-a71d-6105eac3dd26.jpg?v=1755510780", description: "A charming blend of fresh lilies" },
            { name: "WishCare Hair Growth Serum Concentrate, Redensyl & Anagain", price: 999, image: "https://aaronbd.com/wp-content/uploads/2025/05/WishCare-Hair-Growth-Serum-Concentrate-1.jpg", description: "Boost hair growth and reduces hair fall" },
            { name: "Plum BodyLovin' Vanillla Vibes Body Oil-Intense Moisture & Instant Glow ", price: 499, image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/qdnzpmoihv0uhhqsl4tz.jpg?dpr=3&format=auto", description: "Nourishes and repairs dry skin." }
        ];
        await productModel.insertMany(products);
        res.json({ message: 'Products seeded successfully', count: products.length });
    } catch (error) {
        console.error('Seed error:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

exports.deleteProduct = async(req, res) => {
    const id = req.params.id;
    const deleted = await productModel.findByIdAndDelete(id);
    if(!deleted){
        return res.status(404).json({message:"Product not found"})
    }
    res.status(204).json({message:"Record deleted"})
}

exports.updateProduct = async(req, res) => {
    try {
        const id = req.params.id;
        const {name, description, price, image} = req.body;
    
        const updated = await productModel.findByIdAndUpdate(
            id, {name, description, price, image}, {new:true}
        )
        if(!updated)
        {
            return res.status(404).json({message: "Product not found"})
        }
        res.json(updated)
    } catch (error) {
         console.error("error in posting");
    res.status(500).json({ error: 'Server error' }); 
    }
}