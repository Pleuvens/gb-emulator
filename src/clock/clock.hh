#pragme once

class Clock {
public:
    Clock();
    ~Clock();

    inline int getM() { return m; }
    inline int getT() { return t; }

    inline void setM(const int& value) { m = value; }
    inline void setT(const int& value) { t = value; }

protected:
    int m;
    int t;
};
