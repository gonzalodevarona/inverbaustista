package com.inverbautista.isc.raffle;

import com.inverbautista.isc.utils.CastEnumUtil;

public enum RaffleStatus {
    ACTIVE, INACTIVE, SOLDOUT, POSTPONED, COMPLETED;
    static public RaffleStatus castEnum(String id) {
        return CastEnumUtil.lookup(RaffleStatus.class, id);
    }
}
