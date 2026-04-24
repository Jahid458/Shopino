import { NextResponse } from "next/server";
import Product from "@/app/models/Product";
import { connectDB } from "@/lib/mongodb";

// POST - Add a new product
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

