package com.lyubomyr.efuel.data;

import com.lyubomyr.efuel.Constants.AppConstants;
import com.lyubomyr.efuel.data.api.Socar.ISocarAPI;

import retrofit2.Retrofit;
import retrofit2.Retrofit.Builder;
import retrofit2.converter.jackson.JacksonConverterFactory;

public class DataAggregator {
    public DataAggregator(){
        SocarAPIInstance = new Builder()
                .baseUrl(AppConstants.SocarBaseUrl)
                .addConverterFactory(JacksonConverterFactory.create())
                .build();
        SocarApi = SocarAPIInstance.create(ISocarAPI.class);
    }

    public Retrofit SocarAPIInstance;
    public ISocarAPI SocarApi;

    private static DataAggregator INSTANCE;

    public static DataAggregator getInstance(){
        if(INSTANCE == null){
            synchronized (DataAggregator.class){
                INSTANCE = new DataAggregator();
            }
        }

        return INSTANCE;
    }
}
