package com.lyubomyr.efuel.data.api.Okko;
import com.lyubomyr.efuel.data.models.Okko.Okko;

import retrofit2.Call;
import retrofit2.http.GET;

public interface IOkkoAPI {
    @GET("/api/uk/type/gas_stations")
    Call<Okko> getStationsData();
}
