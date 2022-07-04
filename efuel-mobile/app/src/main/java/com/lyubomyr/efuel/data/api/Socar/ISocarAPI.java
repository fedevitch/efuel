package com.lyubomyr.efuel.data.api.Socar;
import com.lyubomyr.efuel.Constants.AppConstants;
import com.lyubomyr.efuel.data.models.Socar.Socar;

import retrofit2.Call;
import retrofit2.http.GET;

public interface ISocarAPI {
    @GET("/api/map/stations")
    Call<Socar> getStationsData();
}
