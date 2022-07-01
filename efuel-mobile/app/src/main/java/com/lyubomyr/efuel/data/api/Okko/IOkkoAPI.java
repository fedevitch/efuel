package com.lyubomyr.efuel.data.api.Okko;
import com.lyubomyr.efuel.data.models.Okko.Okko;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Headers;

public interface IOkkoAPI {
    @Headers({
        "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36"
    })
    @GET("/api/uk/type/gas_stations")
    Call<Okko> getStationsData();
}
