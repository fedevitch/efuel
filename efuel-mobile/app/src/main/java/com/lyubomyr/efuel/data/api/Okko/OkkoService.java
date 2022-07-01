package com.lyubomyr.efuel.data.api.Okko;

import android.util.Log;

import com.lyubomyr.efuel.Constants.AppConstants;
import com.lyubomyr.efuel.data.models.Okko.Okko;
import com.lyubomyr.efuel.data.models.Socar.Socar;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import retrofit2.Call;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.jackson.JacksonConverterFactory;

public class OkkoService {
    OkkoService(){
        pool = Executors.newCachedThreadPool();

        requestProvider = new Retrofit.Builder()
                .baseUrl(AppConstants.OkkoBaseUrl)
                .addConverterFactory(JacksonConverterFactory.create())
                .build();
        apiService = requestProvider.create(IOkkoAPI.class);
    }
    private static OkkoService INSTANCE;
    private final String LOG_TAG = "Okko API service";
    private final Retrofit requestProvider;
    private final IOkkoAPI apiService;
    private final ExecutorService pool;

    private Okko sendRequest(){
        try {
            Call<Okko> apiRequest = apiService.getStationsData();
            Response<Okko> response = apiRequest.execute();
            Log.d(LOG_TAG, String.valueOf(response.code()));
            if(response.body() != null) {
                Log.d(LOG_TAG, String.valueOf(response.body().getCollection().size()));
                return response.body();
            } else {
                Log.d(LOG_TAG, "body null");
            }
            //
        } catch (Exception e) {
            Log.e(LOG_TAG, e.toString());
            // Log.e("socar", "error");
        }
        return null;
    }
    private final Callable<Okko> r = this::sendRequest;

    public Okko GetStations(){
        Future<Okko> data = pool.submit(r);

        try {
            return data.get();
        } catch (ExecutionException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static OkkoService getInstance(){
        if(INSTANCE == null){
            synchronized (OkkoService.class){
                INSTANCE = new OkkoService();
            }
        }

        return INSTANCE;
    }
}
