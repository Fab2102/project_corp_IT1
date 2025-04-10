let parcelXML = null;
async function loadXML() {
  try {
    const response = await fetch("/xml/forest-infos.xml");
    if (!response.ok) throw new Error("Network response was not ok");
    const xmlString = await response.text();
    parcelXML = new DOMParser().parseFromString(xmlString, "application/xml");
  } catch (error) {
    console.error("Error fetching XML:", error);
  }
}
loadXML();

const getText = (el, tag) => el.querySelector(tag)?.textContent || "N/A";

function getParcelById(id) {
  if (!parcelXML) return null;
  const parcel = parcelXML.querySelector(`parcel[id="${id}"]`);
  if (!parcel) return null;
  return {
    title: getText(parcel, "title"),
    location: getText(parcel, "location"),
    size: getText(parcel, "size"),
    price: getText(parcel, "price"),
    notes: getText(parcel, "notes"),
  };
}

function displayParcel(id) {
  const parcel = getParcelById(id);
  const content = parcel
    ? `
        <h3 style="color: #2d6a4f;">${parcel.title}</h3>
        <p><strong>Location:</strong> ${parcel.location}</p>
        <p><strong>Size:</strong> ${parcel.size} hectares</p>
        <p><strong>Price:</strong> ${parcel.price}</p>
        <p><strong>Notes:</strong> ${parcel.notes}</p>
      `
    : "<p>Parcel not found.</p>";
  document.getElementById("parcelDetails").innerHTML = content;
}
