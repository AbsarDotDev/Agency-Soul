import { NextRequest, NextResponse } from "next/server";

function GET(request:NextRequest) {
    return NextResponse.json("Hello");
}