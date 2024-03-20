package com.inverbautista.isc.utils;

public class CastEnumUtil {
    public static <E extends Enum<E>> E lookup(Class<E> e, String id) {
        try {
            E result = Enum.valueOf(e, id);
            return result;
        } catch (IllegalArgumentException ex) {
            // log error or something here

            throw new RuntimeException(
                    "Invalid value for enum " + e.getSimpleName() + ": " + id);
        }


    }
}
