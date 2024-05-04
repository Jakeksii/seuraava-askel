type Address = {
    street: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
}

export default function getAddressObject(result: google.maps.GeocoderResult) {
    const ShouldBeComponent: Record<string, string[]> = {
        zipcode: ["postal_code"],
        street: ["street_address", "route"],
        street_number: ["street_number"],
        state: [
            "administrative_area_level_1",
            "administrative_area_level_2",
            "administrative_area_level_3",
            "administrative_area_level_4",
            "administrative_area_level_5"
        ],
        city: [
            "locality",
            "sublocality",
            "sublocality_level_1",
            "sublocality_level_2",
            "sublocality_level_3",
            "sublocality_level_4"
        ],
        country: ["country"]
    };

    const address: Record<string, string> = {
        street_number: "",
        zipcode: "",
        street: "",
        state: "",
        city: "",
        country: ""
    };
    // eslint-disable-next-line
    result.address_components.forEach((component: { types: any[]; short_name: string; long_name: any; }) => {
        for (const shouldBe in ShouldBeComponent) {
            if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
                address[shouldBe] = component.long_name;
            }
        }
    });
    const formattedAddress = {
        ...address,
        street: address.street + " " + address.street_number
    }
    return formattedAddress as Address
}