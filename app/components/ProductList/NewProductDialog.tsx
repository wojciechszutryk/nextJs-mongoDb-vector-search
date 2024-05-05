"use client";
import { FormEvent, useState } from "react";
import TextInput from "../Input";
import Dialog from "../Dialog";
import Button from "../Button";

const NewProductDialog = () => {
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    <>
      <Button onClick={() => setIsDialogOpened(true)}>Add New Product</Button>
      <Dialog
        title={"Create new product"}
        isOpened={isDialogOpened}
        onClose={() => setIsDialogOpened(false)}
      >
        {error && <div className="text-red-600">{error}</div>}
        <form onSubmit={onSubmit} className="space-y-4 w-100">
          <TextInput label={"product name"} name={"product_name"} required />
          <TextInput label={"manufacturer"} name={"manufacturer"} min={1} />
          <TextInput label={"price (£)"} name={"price"} required />

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Dialog>
    </>
  );
};

export default NewProductDialog;
