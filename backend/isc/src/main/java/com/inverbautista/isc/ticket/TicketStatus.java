package com.inverbautista.isc.ticket;

import com.inverbautista.isc.utils.CastEnumUtil;

public enum TicketStatus {

    AVAILABLE, SOLD, WINNER, DISABLED;
    static public TicketStatus castEnum(String id) {
        return CastEnumUtil.lookup(TicketStatus.class, id.toUpperCase());
    }
}
