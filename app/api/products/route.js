import { NextResponse } from "next/server";
import Product from "@/app/models/Product";
import { connectDB } from "@/lib/mongodb";


export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const product = await Product.create(body);

    return NextResponse.json( { success: true, product },{ status: 201 });

  } catch (error) {
    return NextResponse.json( { success: false, message: error.message }, { status: 500 });
  }
}


export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const minPrice = Number(searchParams.get("minPrice")) || 0;
    const maxPrice = Number(searchParams.get("maxPrice")) || 1500;
    const sort = searchParams.get("sort") || "newest";

    const filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { fullDescription: { $regex: search, $options: "i" } },
      ];
    }

    if (category && category !== "all") {
      filter.category = category;
    }

    filter.price = { $gte: minPrice, $lte: maxPrice };

    const sortOption = sort === "price-asc"  ? { price: 1 }
      : sort === "price-desc" ? { price: -1 }
      : sort === "oldest"     ? { createdAt: 1 }
      : { createdAt: -1 };

    const products = await Product.find(filter).sort(sortOption).lean();

    return NextResponse.json({ success: true, products });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}



