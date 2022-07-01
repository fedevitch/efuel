package com.lyubomyr.efuel.data;

import android.util.Log;

import com.lyubomyr.efuel.Constants.AppConstants;
import com.lyubomyr.efuel.data.api.Okko.OkkoService;
import com.lyubomyr.efuel.data.api.Socar.SocarService;
import com.lyubomyr.efuel.data.models.Okko.Okko;
import com.lyubomyr.efuel.data.models.Socar.Socar;

import java.util.List;


public class DataAggregator {
    public DataAggregator(){
        socarService = SocarService.getInstance();
        okkoService = OkkoService.getInstance();

    }

    private final String LOG_TAG = "Data aggregator";
    private final SocarService socarService;
    private final OkkoService okkoService;

    private static DataAggregator INSTANCE;

    public static DataAggregator getInstance(){
        if(INSTANCE == null){
            synchronized (DataAggregator.class){
                INSTANCE = new DataAggregator();
            }
        }

        return INSTANCE;
    }

    public void FetchData() {
        Socar socarStations = socarService.GetStations();
        Log.d(LOG_TAG, socarStations.getData().get(0).getAttributes().getAddress());

//        Okko okkoStations = okkoService.GetStations();
//        Log.d(LOG_TAG, okkoStations.getCollection().get(0).getAttributes().getNaselenyyPunkt());
    }
}
