
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
    "entity_type",
    "pagination",
    "selectedOptions",
    "collection"
})
@Generated("jsonschema2pojo")
public class Okko {

    @JsonProperty("entity_type")
    private EntityType entityType;
    @JsonProperty("pagination")
    private Pagination pagination;
    @JsonProperty("selectedOptions")
    private List<Object> selectedOptions = null;
    @JsonProperty("collection")
    private List<Collection> collection = null;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("entity_type")
    public EntityType getEntityType() {
        return entityType;
    }

    @JsonProperty("entity_type")
    public void setEntityType(EntityType entityType) {
        this.entityType = entityType;
    }

    @JsonProperty("pagination")
    public Pagination getPagination() {
        return pagination;
    }

    @JsonProperty("pagination")
    public void setPagination(Pagination pagination) {
        this.pagination = pagination;
    }

    @JsonProperty("selectedOptions")
    public List<Object> getSelectedOptions() {
        return selectedOptions;
    }

    @JsonProperty("selectedOptions")
    public void setSelectedOptions(List<Object> selectedOptions) {
        this.selectedOptions = selectedOptions;
    }

    @JsonProperty("collection")
    public List<Collection> getCollection() {
        return collection;
    }

    @JsonProperty("collection")
    public void setCollection(List<Collection> collection) {
        this.collection = collection;
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
