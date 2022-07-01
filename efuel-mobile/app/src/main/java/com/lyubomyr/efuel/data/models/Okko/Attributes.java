
package com.lyubomyr.efuel.data.models.Okko;

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
    "pulls95_tip_oplati",
    "a95_evro_tip_oplati",
    "a92_evro_tip_oplati",
    "dp_evro_tip_oplati",
    "gas_tip_oplati",
    "pullsdiesel_tip_oplati",
    "Cod_AZK",
    "Oblast",
    "Naselenyy_punkt",
    "Typ_naselenogo_punktu",
    "Adresa",
    "Typ_obektu",
    "fuel_type",
    "restaurants",
    "car_services",
    "car_washes",
    "other_services",
    "coordinates",
    "rozdilnyy_zbir",
    "post_machines",
    "notification",
    "type_azk"
})
@Generated("jsonschema2pojo")
public class Attributes {

    @JsonProperty("pulls95_tip_oplati")
    private Object pulls95TipOplati;
    @JsonProperty("a95_evro_tip_oplati")
    private Object a95EvroTipOplati;
    @JsonProperty("a92_evro_tip_oplati")
    private Object a92EvroTipOplati;
    @JsonProperty("dp_evro_tip_oplati")
    private Object dpEvroTipOplati;
    @JsonProperty("gas_tip_oplati")
    private Object gasTipOplati;
    @JsonProperty("pullsdiesel_tip_oplati")
    private Boolean pullsdieselTipOplati;
    @JsonProperty("Cod_AZK")
    private Integer codAZK;
    @JsonProperty("Oblast")
    private List<Object> oblast = null;
    @JsonProperty("Naselenyy_punkt")
    private String naselenyyPunkt;
    @JsonProperty("Typ_naselenogo_punktu")
    private String typNaselenogoPunktu;
    @JsonProperty("Adresa")
    private String adresa;
    @JsonProperty("Typ_obektu")
    private TypObektu typObektu;
    @JsonProperty("fuel_type")
    private List<FuelType> fuelType = null;
    @JsonProperty("restaurants")
    private List<Object> restaurants = null;
    @JsonProperty("car_services")
    private List<CarService> carServices = null;
    @JsonProperty("car_washes")
    private List<Object> carWashes = null;
    @JsonProperty("other_services")
    private List<OtherService> otherServices = null;
    @JsonProperty("coordinates")
    private Coordinates coordinates;
    @JsonProperty("rozdilnyy_zbir")
    private List<Object> rozdilnyyZbir = null;
    @JsonProperty("post_machines")
    private List<PostMachine> postMachines = null;
    @JsonProperty("notification")
    private String notification;
    @JsonProperty("type_azk")
    private Integer typeAzk;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("pulls95_tip_oplati")
    public Object getPulls95TipOplati() {
        return pulls95TipOplati;
    }

    @JsonProperty("pulls95_tip_oplati")
    public void setPulls95TipOplati(Object pulls95TipOplati) {
        this.pulls95TipOplati = pulls95TipOplati;
    }

    @JsonProperty("a95_evro_tip_oplati")
    public Object getA95EvroTipOplati() {
        return a95EvroTipOplati;
    }

    @JsonProperty("a95_evro_tip_oplati")
    public void setA95EvroTipOplati(Object a95EvroTipOplati) {
        this.a95EvroTipOplati = a95EvroTipOplati;
    }

    @JsonProperty("a92_evro_tip_oplati")
    public Object getA92EvroTipOplati() {
        return a92EvroTipOplati;
    }

    @JsonProperty("a92_evro_tip_oplati")
    public void setA92EvroTipOplati(Object a92EvroTipOplati) {
        this.a92EvroTipOplati = a92EvroTipOplati;
    }

    @JsonProperty("dp_evro_tip_oplati")
    public Object getDpEvroTipOplati() {
        return dpEvroTipOplati;
    }

    @JsonProperty("dp_evro_tip_oplati")
    public void setDpEvroTipOplati(Object dpEvroTipOplati) {
        this.dpEvroTipOplati = dpEvroTipOplati;
    }

    @JsonProperty("gas_tip_oplati")
    public Object getGasTipOplati() {
        return gasTipOplati;
    }

    @JsonProperty("gas_tip_oplati")
    public void setGasTipOplati(Object gasTipOplati) {
        this.gasTipOplati = gasTipOplati;
    }

    @JsonProperty("pullsdiesel_tip_oplati")
    public Boolean getPullsdieselTipOplati() {
        return pullsdieselTipOplati;
    }

    @JsonProperty("pullsdiesel_tip_oplati")
    public void setPullsdieselTipOplati(Boolean pullsdieselTipOplati) {
        this.pullsdieselTipOplati = pullsdieselTipOplati;
    }

    @JsonProperty("Cod_AZK")
    public Integer getCodAZK() {
        return codAZK;
    }

    @JsonProperty("Cod_AZK")
    public void setCodAZK(Integer codAZK) {
        this.codAZK = codAZK;
    }

    @JsonProperty("Oblast")
    public List<Object> getOblast() {
        return oblast;
    }

    @JsonProperty("Oblast")
    public void setOblast(List<Object> oblast) {
        this.oblast = oblast;
    }

    @JsonProperty("Naselenyy_punkt")
    public String getNaselenyyPunkt() {
        return naselenyyPunkt;
    }

    @JsonProperty("Naselenyy_punkt")
    public void setNaselenyyPunkt(String naselenyyPunkt) {
        this.naselenyyPunkt = naselenyyPunkt;
    }

    @JsonProperty("Typ_naselenogo_punktu")
    public String getTypNaselenogoPunktu() {
        return typNaselenogoPunktu;
    }

    @JsonProperty("Typ_naselenogo_punktu")
    public void setTypNaselenogoPunktu(String typNaselenogoPunktu) {
        this.typNaselenogoPunktu = typNaselenogoPunktu;
    }

    @JsonProperty("Adresa")
    public String getAdresa() {
        return adresa;
    }

    @JsonProperty("Adresa")
    public void setAdresa(String adresa) {
        this.adresa = adresa;
    }

    @JsonProperty("Typ_obektu")
    public TypObektu getTypObektu() {
        return typObektu;
    }

    @JsonProperty("Typ_obektu")
    public void setTypObektu(TypObektu typObektu) {
        this.typObektu = typObektu;
    }

    @JsonProperty("fuel_type")
    public List<FuelType> getFuelType() {
        return fuelType;
    }

    @JsonProperty("fuel_type")
    public void setFuelType(List<FuelType> fuelType) {
        this.fuelType = fuelType;
    }

    @JsonProperty("restaurants")
    public List<Object> getRestaurants() {
        return restaurants;
    }

    @JsonProperty("restaurants")
    public void setRestaurants(List<Object> restaurants) {
        this.restaurants = restaurants;
    }

    @JsonProperty("car_services")
    public List<CarService> getCarServices() {
        return carServices;
    }

    @JsonProperty("car_services")
    public void setCarServices(List<CarService> carServices) {
        this.carServices = carServices;
    }

    @JsonProperty("car_washes")
    public List<Object> getCarWashes() {
        return carWashes;
    }

    @JsonProperty("car_washes")
    public void setCarWashes(List<Object> carWashes) {
        this.carWashes = carWashes;
    }

    @JsonProperty("other_services")
    public List<OtherService> getOtherServices() {
        return otherServices;
    }

    @JsonProperty("other_services")
    public void setOtherServices(List<OtherService> otherServices) {
        this.otherServices = otherServices;
    }

    @JsonProperty("coordinates")
    public Coordinates getCoordinates() {
        return coordinates;
    }

    @JsonProperty("coordinates")
    public void setCoordinates(Coordinates coordinates) {
        this.coordinates = coordinates;
    }

    @JsonProperty("rozdilnyy_zbir")
    public List<Object> getRozdilnyyZbir() {
        return rozdilnyyZbir;
    }

    @JsonProperty("rozdilnyy_zbir")
    public void setRozdilnyyZbir(List<Object> rozdilnyyZbir) {
        this.rozdilnyyZbir = rozdilnyyZbir;
    }

    @JsonProperty("post_machines")
    public List<PostMachine> getPostMachines() {
        return postMachines;
    }

    @JsonProperty("post_machines")
    public void setPostMachines(List<PostMachine> postMachines) {
        this.postMachines = postMachines;
    }

    @JsonProperty("notification")
    public String getNotification() {
        return notification;
    }

    @JsonProperty("notification")
    public void setNotification(String notification) {
        this.notification = notification;
    }

    @JsonProperty("type_azk")
    public Integer getTypeAzk() {
        return typeAzk;
    }

    @JsonProperty("type_azk")
    public void setTypeAzk(Integer typeAzk) {
        this.typeAzk = typeAzk;
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
