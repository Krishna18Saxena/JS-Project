export default {
  async fetch(request) {

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }

    const url = new URL(request.url);

    if (url.pathname !== "/data" || request.method !== "POST") {
      return new Response("Not Found", { status: 404 });
    }

    try {
      const body = await request.json();
      const { type, value } = body;

      let reversed;

      if (type === "string") {
        reversed = value.split("").reverse().join("");
      } 
      else if (type === "array") {
        reversed = value.reverse();
      } 
      else if (type === "words") {
        reversed = value.split(" ").reverse().join(" ");
      } 
      else if (type === "number") {
        reversed = parseInt(String(value).split("").reverse().join(""));
      } 
      else {
        return new Response("Invalid type", { status: 400 });
      }

      return new Response(
        JSON.stringify({
          reversed,
          email: "23f3001039@ds.study.iitm.ac.in"
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );

    } catch {
      return new Response("Bad Request", { status: 400 });
    }
  }
};
