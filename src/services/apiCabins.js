import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error("Cabins could not be loaded");
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/CabinImages/${imageName}`;

  //1. create/edit cabin
  let query = supabase.from("cabins");

  //A. create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //B. Edit
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  //2. upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("CabinImages")
    .upload(imageName, newCabin.image);

  //3.delete cabin if an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    if (error) {
      console.error(storageError);
      throw new Error(
        "Cabin image could not be uploaded. Cabin was not created"
      );
    }
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error("Cabin could not be deleted");
    throw new Error("Cabin  could not be deleted");
  }
}
