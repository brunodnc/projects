
import java.util.Objects;

public class LicensePlate {
    // don't modify existing parts of this class

    // these instance variables have been defined as final, meaning 
    // that once set, their value can't be changed
    private final String liNumber;
    private final String country;

    public LicensePlate(String country, String liNumber) {
        this.liNumber = liNumber;
        this.country = country;
    }

    @Override
    public String toString() {
        return country + " " + liNumber;
    }
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }

        if (obj == null) {
            return false;
        }

        if (!(obj instanceof LicensePlate)) {
            return false;
        }

        LicensePlate compared = (LicensePlate) obj;

        if (this.country != compared.country || this.liNumber != compared.liNumber) {
            return false;
        }
        return true;
    }
    
    @Override
    public int hashCode() {
        int hash = this.country.hashCode();
        hash *= this.liNumber.hashCode();
        return hash;
    }

}
