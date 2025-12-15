import { Link } from "react-router-dom";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import SupplierContacts from "./SupplierContacts";
import { Label } from "../../ui/Label";

const SupplierFrom = ({
    handler,
    supplierData,
    setSupplierData,
    loading,
    isEditing = false,
}) => {
    const handleChange = (e) => {
        setSupplierData({ ...supplierData, [e.target.id]: e.target.value });
    };

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Loader size={50} className="animate-spin" />
            </div>
        );
    }
    return (
        <div className="h-screen w-full p-4 transform transition-transform duration-300 overflow-y-scroll">
            <div className="mb-4 relative">
                <h1 className="text-primary font-bold text-xl">
                    {isEditing ? "Edit Supplier" : "Add Supplier"}
                </h1>
                {isEditing ? (
                    <p>Edit the existing detials.</p>
                ) : (
                    <p>Fill the detials to add new supplier.</p>
                )}
                <p>
                    <span className="text-red-500">* </span>
                    is required fields
                </p>
            </div>
            <form onSubmit={handler} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label htmlFor="name">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="name"
                            name="supplier-name"
                            value={supplierData?.name}
                            autoComplete="supplier-name"
                            required
                            placeholder="Enter supplier name..."
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="company">
                            Company <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="company"
                            name="supplier-company"
                            value={supplierData?.company}
                            autoComplete="supplier-company"
                            required
                            placeholder="Enter supplier company..."
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="address">
                            Address <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="address"
                            name="supplier-address"
                            value={supplierData?.address}
                            autoComplete="supplier-address"
                            required
                            placeholder="Enter supplier address..."
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Input
                            id="email"
                            name="supplier-email"
                            value={supplierData?.email}
                            autoComplete="supplier-email"
                            required
                            placeholder="Enter supplier email..."
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div>
                    <label>Contacts</label>
                    <br />
                    <SupplierContacts
                        setSupplierData={setSupplierData}
                        supplierData={supplierData}
                    />
                </div>
                <div className="w-full flex items-center justify-end">
                    <div>
                        <Link to="/suppliers?prevRoute=/suppliers/add-supplier">
                            <Button variant="danger" className="mr-2">
                                Cancel
                            </Button>
                        </Link>
                        <Button type="submit">
                            {isEditing ? "Update Supplier" : "Add Supplier"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SupplierFrom;
