
package com.lyubomyr.efuel.data.models.Socar;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Generated;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "title",
    "address",
    "tel",
    "city_slug",
    "street_slug",
    "marker",
    "fuelPrices",
    "services"
})
@Generated("jsonschema2pojo")
public class Attributes {

    @JsonProperty("title")
    private String title;
    @JsonProperty("address")
    private String address;
    @JsonProperty("tel")
    private String tel;
    @JsonProperty("city_slug")
    private String citySlug;
    @JsonProperty("street_slug")
    private String streetSlug;
    @JsonProperty("marker")
    private Marker marker;
    @JsonProperty("fuelPrices")
    private List<String> fuelPrices = null;
    @JsonProperty("services")
    private List<String> services = null;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("title")
    public String getTitle() {
        return title;
    }

    @JsonProperty("title")
    public void setTitle(String title) {
        this.title = title;
    }

    @JsonProperty("address")
    public String getAddress() {
        return address;
    }

    @JsonProperty("address")
    public void setAddress(String address) {
        this.address = address;
    }

    @JsonProperty("tel")
    public String getTel() {
        return tel;
    }

    @JsonProperty("tel")
    public void setTel(String tel) {
        this.tel = tel;
    }

    @JsonProperty("city_slug")
    public String getCitySlug() {
        return citySlug;
    }

    @JsonProperty("city_slug")
    public void setCitySlug(String citySlug) {
        this.citySlug = citySlug;
    }

    @JsonProperty("street_slug")
    public String getStreetSlug() {
        return streetSlug;
    }

    @JsonProperty("street_slug")
    public void setStreetSlug(String streetSlug) {
        this.streetSlug = streetSlug;
    }

    @JsonProperty("marker")
    public Marker getMarker() {
        return marker;
    }

    @JsonProperty("marker")
    public void setMarker(Marker marker) {
        this.marker = marker;
    }

    @JsonProperty("fuelPrices")
    public List<String> getFuelPrices() {
        return fuelPrices;
    }

    @JsonProperty("fuelPrices")
    public void setFuelPrices(List<String> fuelPrices) {
        this.fuelPrices = fuelPrices;
    }

    @JsonProperty("services")
    public List<String> getServices() {
        return services;
    }

    @JsonProperty("services")
    public void setServices(List<String> services) {
        this.services = services;
    }

    @JsonAnyGetter
    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    @JsonAnySetter
    public void setAdditionalProperty(String name, Object value) {
        this.additionalProperties.put(name, value);
    }

}
