import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import the styles
import { toast } from "react-toastify";

const RichTextEditor = () => {
  const [highlights, setHighlights] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the form data to the server using fetch
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ highlights, details }),
      });

      if (response.ok) {
        // Reset the form after successful submission
        setHighlights("");
        setDetails("");

        console.log("Product submitted successfully!");
      } else {
        console.error("Failed to submit product:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto my-16">
      <form onSubmit={handleSubmit}>
        <label>
          Product Highlights:
          <ReactQuill
            value={highlights}
            onChange={(value) => setHighlights(value)}
          />
        </label>
        <br />
        <label>
          Product Details:
          <ReactQuill value={details} onChange={(value) => setDetails(value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RichTextEditor;
