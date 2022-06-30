package com.lyubomyr.efuel.data.api.Socar;

import android.provider.ContactsContract;
import android.util.Log;

import com.lyubomyr.efuel.data.DataAggregator;
import com.lyubomyr.efuel.data.models.Socar.Socar;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import retrofit2.Call;
import retrofit2.Response;

public class SocarService {
    SocarService(){
        pool = Executors.newCachedThreadPool();
    }
    private final String LOG_TAG = "Socar API service";

    public Socar GetStations(){
        Future<Socar> data = pool.submit(r);

        try {
            return data.get();
        } catch (ExecutionException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return null;
    }

    private Socar getStations(){
        DataAggregator dataAggregator = DataAggregator.getInstance();
        try {
            Call<Socar> apiRequest = dataAggregator.SocarApi.getStationsData();
            Response<Socar> response = apiRequest.execute();
            Log.d(LOG_TAG, String.valueOf(response.code()));
            if(response.body() != null) {
                Log.d(LOG_TAG, String.valueOf(response.body().getData().size()));
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
    private final Callable<Socar> r = this::getStations;
    private final ExecutorService pool;

    private static SocarService INSTANCE;
    public static SocarService getInstance(){
        if(INSTANCE == null){
            synchronized (SocarService.class){
                INSTANCE = new SocarService();
            }
        }

        return INSTANCE;
    }
}
