
package com.lyubomyr.efuel.data.models.Shell;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Shell {

    private String id;
    private int type;
    private String brand;
    private String name;
    private double lat;
    private double lng;
    private String countryCode;
    private String address;
    private String city;
    private String state;
    private String postcode;
    private String telephone;
    private String country;
    private List<String> amenities = null;
    private boolean inactive;
    private double distance;
    private Object drivingDistance;
    private Object drivingDuration;
    private String websiteUrl;
    private String openStatus;
    private Object nextOpenStatusChange;
    private int tzOffset;
    private List<String> fuels = null;
    private Object nextForecourtOpenStatusChange;
    private Object nextShopOpenStatusChange;
    private String forecourtOpenStatus;
    private String shopOpenStatus;
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLng() {
        return lng;
    }

    public void setLng(double lng) {
        this.lng = lng;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public List<String> getAmenities() {
        return amenities;
    }

    public void setAmenities(List<String> amenities) {
        this.amenities = amenities;
    }

    public boolean isInactive() {
        return inactive;
    }

    public void setInactive(boolean inactive) {
        this.inactive = inactive;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public Object getDrivingDistance() {
        return drivingDistance;
    }

    public void setDrivingDistance(Object drivingDistance) {
        this.drivingDistance = drivingDistance;
    }

    public Object getDrivingDuration() {
        return drivingDuration;
    }

    public void setDrivingDuration(Object drivingDuration) {
        this.drivingDuration = drivingDuration;
    }

    public String getWebsiteUrl() {
        return websiteUrl;
    }

    public void setWebsiteUrl(String websiteUrl) {
        this.websiteUrl = websiteUrl;
    }

    public String getOpenStatus() {
        return openStatus;
    }

    public void setOpenStatus(String openStatus) {
        this.openStatus = openStatus;
    }

    public Object getNextOpenStatusChange() {
        return nextOpenStatusChange;
    }

    public void setNextOpenStatusChange(Object nextOpenStatusChange) {
        this.nextOpenStatusChange = nextOpenStatusChange;
    }

    public int getTzOffset() {
        return tzOffset;
    }

    public void setTzOffset(int tzOffset) {
        this.tzOffset = tzOffset;
    }

    public List<String> getFuels() {
        return fuels;
    }

    public void setFuels(List<String> fuels) {
        this.fuels = fuels;
    }

    public Object getNextForecourtOpenStatusChange() {
        return nextForecourtOpenStatusChange;
    }

    public void setNextForecourtOpenStatusChange(Object nextForecourtOpenStatusChange) {
        this.nextForecourtOpenStatusChange = nextForecourtOpenStatusChange;
    }

    public Object getNextShopOpenStatusChange() {
        return nextShopOpenStatusChange;
    }

    public void setNextShopOpenStatusChange(Object nextShopOpenStatusChange) {
        this.nextShopOpenStatusChange = nextShopOpenStatusChange;
    }

    public String getForecourtOpenStatus() {
        return forecourtOpenStatus;
    }

    public void setForecourtOpenStatus(String forecourtOpenStatus) {
        this.forecourtOpenStatus = forecourtOpenStatus;
    }

    public String getShopOpenStatus() {
        return shopOpenStatus;
    }

    public void setShopOpenStatus(String shopOpenStatus) {
        this.shopOpenStatus = shopOpenStatus;
    }

    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    public void setAdditionalProperty(String name, Object value) {
        this.additionalProperties.put(name, value);
    }

}
