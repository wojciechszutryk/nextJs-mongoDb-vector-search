"use client";
import React, { useState, FormEvent } from "react";
import TextInput from "./components/input";

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null); // Clear previous errors when a new request starts

    try {
      const formData = new FormData(event.currentTarget);

      if (!formData.get("manufacturer")) {
        formData.delete("manufacturer");
      }

      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit the data. Please try again.");
      }

      // Handle response if necessary
      const data = await response.json();
      // ...
    } catch (error) {
      if (error instanceof Error) {
        // Capture the error message to display to the user
        setError(error.message);
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-xs mx-auto">
      {error && <div className="text-red-600">{error}</div>}
      <form onSubmit={onSubmit} className="space-y-4">
        <TextInput label={"product name"} name={"product_name"} required />
        <TextInput label={"manufacturer"} name={"manufacturer"} min={1} />
        <TextInput label={"price (£)"} name={"price"} required />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
